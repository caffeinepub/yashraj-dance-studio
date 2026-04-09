import {
  type Enquiry,
  type PhotoMeta,
  PhotoSection,
  createActor,
} from "@/backend";
import { useAdmin } from "@/hooks/useAdmin";
import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  Calendar,
  ChevronDown,
  Image,
  Inbox,
  LogOut,
  Phone,
  Shield,
  Trash2,
  Upload,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ─── Section options ───────────────────────────────────────────────────────────
const SECTION_OPTIONS: { value: PhotoSection; label: string }[] = [
  { value: PhotoSection.hero, label: "Hero Banner" },
  { value: PhotoSection.gallery, label: "Gallery" },
  { value: PhotoSection.services, label: "Services" },
  { value: PhotoSection.facilities, label: "Facilities" },
  { value: PhotoSection.testimonials, label: "Testimonials" },
];

function sectionLabel(s: PhotoSection): string {
  return SECTION_OPTIONS.find((o) => o.value === s)?.label ?? s;
}

function formatDate(ts: bigint): string {
  return new Date(Number(ts) / 1_000_000).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ─── Upload Zone ───────────────────────────────────────────────────────────────
interface UploadZoneProps {
  section: PhotoSection;
  token: string;
  onUploadDone: () => void;
}

function UploadZone({ section, token, onUploadDone }: UploadZoneProps) {
  const { actor, isFetching } = useActor(createActor);
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState<number | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!actor || isFetching) {
      setUploadError("Not connected. Please wait.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("File exceeds 5 MB limit.");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setUploadError("Only JPG, PNG, or WebP files are allowed.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setProgress(0);

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { ExternalBlob } = await import("@/backend");
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setProgress(Math.round(pct * 100));
      });

      // Upload via object-storage extension wired through the Backend constructor
      const actorWithUpload = actor as unknown as {
        _uploadFile: (b: typeof blob) => Promise<Uint8Array>;
      };
      const storedBytes = await actorWithUpload._uploadFile(blob);
      const storageRef = String.fromCharCode(...storedBytes);

      await actor.addPhotoMeta(
        {
          section,
          filename: file.name,
          storageRef,
          displayOrder: BigInt(Date.now()),
        },
        token,
      );

      setProgress(100);
      setTimeout(() => {
        setProgress(null);
        setUploading(false);
        onUploadDone();
      }, 600);
    } catch {
      setUploadError("Upload failed. Please try again.");
      setUploading(false);
      setProgress(null);
    }
  }

  function onDrop(e: React.DragEvent<HTMLButtonElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  return (
    <div className="mb-6">
      <button
        type="button"
        className="w-full rounded-xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-smooth"
        style={{
          border: dragging
            ? "2px dashed #00bcd4"
            : "2px dashed rgba(255,255,255,0.1)",
          background: dragging
            ? "rgba(0,188,212,0.06)"
            : "rgba(255,255,255,0.02)",
          minHeight: "140px",
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => fileRef.current?.click()}
        aria-label="Upload photo — click or drag and drop"
        disabled={uploading}
        data-ocid="photo-upload-zone"
      >
        <Upload size={28} style={{ color: dragging ? "#00bcd4" : "#555" }} />
        <div className="text-center pointer-events-none">
          <p className="text-sm font-medium" style={{ color: "#a0a0a0" }}>
            Drop photo here or{" "}
            <span style={{ color: "#00bcd4" }}>click to browse</span>
          </p>
          <p className="text-xs mt-1" style={{ color: "#555" }}>
            JPG, PNG, WebP · Max 5 MB
          </p>
        </div>
      </button>
      <input
        ref={fileRef}
        id="photo-file-input"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onInputChange}
        disabled={uploading}
        data-ocid="photo-file-input"
        aria-label="Choose photo file to upload"
      />

      {/* Progress */}
      {progress !== null && (
        <div className="mt-3">
          <div
            className="flex justify-between text-xs mb-1"
            style={{ color: "#a0a0a0" }}
          >
            <span>{progress < 100 ? "Uploading..." : "Complete!"}</span>
            <span>{progress}%</span>
          </div>
          <div
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.08)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #00bcd4, #7c3aed)",
              }}
            />
          </div>
        </div>
      )}

      {uploadError && (
        <p className="mt-2 text-sm" style={{ color: "#ef4444" }}>
          {uploadError}
        </p>
      )}
    </div>
  );
}

// ─── Photo Card ────────────────────────────────────────────────────────────────
interface PhotoCardProps {
  photo: PhotoMeta;
  token: string;
  onDelete: (id: bigint) => void;
}

function PhotoCard({ photo, onDelete }: PhotoCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden transition-smooth"
      style={{
        background: "#161616",
        border: "1px solid #1f1f1f",
      }}
    >
      {/* Thumbnail */}
      <div className="relative" style={{ aspectRatio: "4/3" }}>
        <img
          src={photo.storageRef}
          alt={photo.filename}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/images/placeholder.svg";
          }}
        />
        <div
          className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium"
          style={{
            background: "rgba(0,0,0,0.7)",
            color: "#00bcd4",
            border: "1px solid rgba(0,188,212,0.3)",
          }}
        >
          {sectionLabel(photo.section)}
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <p
          className="text-sm font-medium truncate mb-1"
          style={{ color: "#e0e0e0" }}
          title={photo.filename}
        >
          {photo.filename}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "#555" }}>
            {formatDate(photo.uploadedAt)}
          </span>

          {confirmDelete ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="text-xs px-2 py-1 rounded-md transition-smooth"
                style={{
                  color: "#a0a0a0",
                  background: "rgba(255,255,255,0.05)",
                }}
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="text-xs px-2 py-1 rounded-md transition-smooth"
                style={{
                  background: "rgba(239,68,68,0.15)",
                  color: "#ef4444",
                  border: "1px solid rgba(239,68,68,0.25)",
                }}
                onClick={() => onDelete(photo.id)}
                data-ocid="photo-delete-confirm"
              >
                Delete
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="p-1.5 rounded-lg transition-smooth"
              style={{ color: "#555", background: "transparent" }}
              onClick={() => setConfirmDelete(true)}
              aria-label={`Delete ${photo.filename}`}
              data-ocid="photo-delete-btn"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Photos Tab ────────────────────────────────────────────────────────────────
interface PhotosTabProps {
  token: string;
}

function PhotosTab({ token }: PhotosTabProps) {
  const { actor } = useActor(createActor);
  const [selectedSection, setSelectedSection] = useState<PhotoSection>(
    PhotoSection.gallery,
  );
  const [photos, setPhotos] = useState<PhotoMeta[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);

  const loadPhotos = useCallback(async () => {
    if (!actor) return;
    setLoadingPhotos(true);
    try {
      const all = await actor.listAllPhotos();
      setPhotos(all);
    } catch {
      // silently fail
    } finally {
      setLoadingPhotos(false);
    }
  }, [actor]);

  useEffect(() => {
    loadPhotos();
  }, [loadPhotos]);

  async function handleDelete(id: bigint) {
    if (!actor) return;
    try {
      await actor.deletePhoto(id, token);
      setPhotos((prev) => prev.filter((p) => p.id !== id));
    } catch {
      // silently fail
    }
  }

  const filteredPhotos = photos.filter((p) => p.section === selectedSection);

  return (
    <div>
      {/* Section Selector */}
      <div className="mb-6" style={{ maxWidth: "320px" }}>
        <label
          htmlFor="upload-section-select"
          className="block text-xs font-semibold uppercase tracking-wider mb-2"
          style={{ color: "#a0a0a0" }}
        >
          Upload to Section
        </label>
        <div className="relative">
          <select
            id="upload-section-select"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value as PhotoSection)}
            className="w-full appearance-none px-4 py-3 pr-10 rounded-xl text-sm"
            style={{
              background: "#161616",
              border: "1px solid #2a2a2a",
              color: "#ffffff",
              outline: "none",
              cursor: "pointer",
            }}
            data-ocid="section-selector"
          >
            {SECTION_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ background: "#161616", color: "#ffffff" }}
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: "#555" }}
          />
        </div>
      </div>

      <UploadZone
        section={selectedSection}
        token={token}
        onUploadDone={loadPhotos}
      />

      {/* Divider */}
      <div className="my-6" style={{ borderTop: "1px solid #1f1f1f" }} />

      {/* Filter tabs by section */}
      <div className="flex flex-wrap gap-2 mb-5">
        {SECTION_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className="px-3 py-1.5 rounded-full text-xs font-medium transition-smooth"
            style={
              selectedSection === opt.value
                ? {
                    background: "linear-gradient(135deg, #00bcd4, #7c3aed)",
                    color: "#fff",
                  }
                : {
                    background: "rgba(255,255,255,0.05)",
                    color: "#a0a0a0",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }
            }
            onClick={() => setSelectedSection(opt.value)}
            data-ocid="photo-section-filter"
          >
            {opt.label}
            <span
              className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
              style={{
                background: "rgba(255,255,255,0.1)",
                color: "#666",
              }}
            >
              {photos.filter((p) => p.section === opt.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      {loadingPhotos ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              key={i}
              className="rounded-xl"
              style={{
                aspectRatio: "4/3",
                background: "#161616",
                border: "1px solid #1f1f1f",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      ) : filteredPhotos.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.08)",
          }}
          data-ocid="photos-empty-state"
        >
          <Image size={40} style={{ color: "#333", marginBottom: "12px" }} />
          <p className="text-sm font-medium" style={{ color: "#555" }}>
            No photos in{" "}
            {SECTION_OPTIONS.find((o) => o.value === selectedSection)?.label}
          </p>
          <p className="text-xs mt-1" style={{ color: "#333" }}>
            Upload your first photo using the zone above
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos
            .sort((a, b) => Number(b.uploadedAt - a.uploadedAt))
            .map((photo) => (
              <PhotoCard
                key={photo.id.toString()}
                photo={photo}
                token={token}
                onDelete={handleDelete}
              />
            ))}
        </div>
      )}
    </div>
  );
}

// ─── Enquiry Card ──────────────────────────────────────────────────────────────
function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="rounded-xl p-5 transition-smooth"
      style={{
        background: "#161616",
        border: "1px solid #1f1f1f",
      }}
      data-ocid="enquiry-card-admin"
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3 className="text-sm font-semibold" style={{ color: "#ffffff" }}>
              {enquiry.name}
            </h3>
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{
                background: "rgba(0,188,212,0.12)",
                color: "#00bcd4",
                border: "1px solid rgba(0,188,212,0.2)",
              }}
            >
              {enquiry.classInterest}
            </span>
          </div>

          <div
            className="flex flex-wrap gap-3 text-xs"
            style={{ color: "#a0a0a0" }}
          >
            <a
              href={`tel:${enquiry.phone}`}
              className="flex items-center gap-1 transition-smooth"
              style={{ color: "#a0a0a0" }}
            >
              <Phone size={11} />
              {enquiry.phone}
            </a>
            {enquiry.email && <span>{enquiry.email}</span>}
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div
            className="flex items-center gap-1 text-xs"
            style={{ color: "#555" }}
          >
            <Calendar size={11} />
            {formatDate(enquiry.submittedAt)}
          </div>
          <a
            href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-smooth"
            style={{
              background: "rgba(37,211,102,0.12)",
              border: "1px solid rgba(37,211,102,0.2)",
              color: "#25d366",
            }}
            data-ocid="enquiry-whatsapp-reply"
          >
            WhatsApp
          </a>
        </div>
      </div>

      {enquiry.message && (
        <>
          <button
            type="button"
            className="mt-3 text-xs transition-smooth flex items-center gap-1"
            style={{ color: "#555" }}
            onClick={() => setExpanded((v) => !v)}
          >
            <ChevronDown
              size={12}
              style={{
                transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
            {expanded ? "Hide" : "View"} message
          </button>

          {expanded && (
            <p
              className="mt-2 text-xs leading-relaxed px-3 py-2 rounded-lg"
              style={{
                color: "#a0a0a0",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {enquiry.message}
            </p>
          )}
        </>
      )}
    </div>
  );
}

// ─── Enquiries Tab ─────────────────────────────────────────────────────────────
interface EnquiriesTabProps {
  token: string;
}

function EnquiriesTab({ token }: EnquiriesTabProps) {
  const { actor } = useActor(createActor);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!actor || !token) return;
    setLoading(true);
    actor
      .listEnquiries(token)
      .then((data) => {
        setEnquiries(
          [...data].sort((a, b) => Number(b.submittedAt - a.submittedAt)),
        );
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [actor, token]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-sm" style={{ color: "#666" }}>
          All enquiries, newest first
        </p>
        <span
          className="px-3 py-1 rounded-full text-xs font-medium"
          style={{
            background: "rgba(124,58,237,0.12)",
            color: "#7c3aed",
            border: "1px solid rgba(124,58,237,0.2)",
          }}
        >
          {enquiries.length} total
        </span>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
              key={i}
              className="rounded-xl h-20"
              style={{
                background: "#161616",
                border: "1px solid #1f1f1f",
                animation: "pulse 1.5s ease-in-out infinite",
              }}
            />
          ))}
        </div>
      ) : enquiries.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px dashed rgba(255,255,255,0.08)",
          }}
          data-ocid="enquiries-empty-state"
        >
          <Inbox size={40} style={{ color: "#333", marginBottom: "12px" }} />
          <p className="text-sm font-medium" style={{ color: "#555" }}>
            No enquiries yet
          </p>
          <p className="text-xs mt-1" style={{ color: "#333" }}>
            When visitors submit the enquiry form, they'll appear here
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {enquiries.map((enq) => (
            <EnquiryCard key={enq.id.toString()} enquiry={enq} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ───────────────────────────────────────────────────────────
type Tab = "photos" | "enquiries";

export default function AdminPage() {
  const { session, logout } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("photos");

  useEffect(() => {
    if (!session.isValidating && !session.isLoggedIn) {
      navigate({ to: "/admin-login" });
    }
  }, [session.isLoggedIn, session.isValidating, navigate]);

  if (session.isValidating) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#0a0a0a" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-t-transparent animate-spin"
            style={{
              borderColor: "rgba(0,188,212,0.3)",
              borderTopColor: "#00bcd4",
            }}
          />
          <p className="text-sm" style={{ color: "#555" }}>
            Verifying session...
          </p>
        </div>
      </div>
    );
  }

  if (!session.isLoggedIn) return null;

  const token = session.token;

  function handleLogout() {
    logout();
    navigate({ to: "/admin-login" });
  }

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "photos", label: "Photos", icon: <Image size={16} /> },
    { id: "enquiries", label: "Enquiries", icon: <Inbox size={16} /> },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#0a0a0a", color: "#ffffff" }}
    >
      {/* Top bar */}
      <header
        className="sticky top-0 z-40"
        style={{
          background: "rgba(10,10,10,0.95)",
          borderBottom: "1px solid #1f1f1f",
          backdropFilter: "blur(20px)",
        }}
        data-ocid="admin-header"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,188,212,0.15), rgba(124,58,237,0.15))",
                  border: "1px solid rgba(0,188,212,0.2)",
                }}
              >
                <Shield size={16} style={{ color: "#00bcd4" }} />
              </div>
              <div>
                <h1
                  className="text-sm font-bold"
                  style={{
                    color: "#ffffff",
                    fontFamily: "var(--font-display)",
                  }}
                >
                  Yashraj Admin
                </h1>
                <p className="text-xs" style={{ color: "#555" }}>
                  Studio Management
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-smooth"
              style={{
                background: "rgba(239,68,68,0.1)",
                border: "1px solid rgba(239,68,68,0.2)",
                color: "#ef4444",
              }}
              data-ocid="admin-logout-btn"
            >
              <LogOut size={14} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div
          className="flex gap-1 p-1 rounded-xl mb-8 w-fit"
          style={{ background: "#111111", border: "1px solid #1f1f1f" }}
          role="tablist"
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-smooth"
              style={
                activeTab === tab.id
                  ? {
                      background: "linear-gradient(135deg, #00bcd4, #7c3aed)",
                      color: "#ffffff",
                    }
                  : { color: "#666", background: "transparent" }
              }
              data-ocid={`admin-tab-${tab.id}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Panels */}
        {activeTab === "photos" && <PhotosTab token={token} />}
        {activeTab === "enquiries" && <EnquiriesTab token={token} />}
      </main>
    </div>
  );
}
