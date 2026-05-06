"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase";
import type { LandingImage } from "@/lib/types";

/** Hardcoded admin emails */
const ADMIN_EMAILS = ["admin@influra.com"];

/**
 * All image slots the homepage expects.
 * Organized by section for the admin UI.
 */
const SLOT_CONFIG = [
  {
    section: "branding",
    title: "Site Logo",
    description: "Logo displayed in header and footer across all pages. Upload a high-quality PNG with transparent background. Recommended: 200×50px or similar wide format.",
    slots: [
      { slot: "site-logo", label: "Site Logo (header + footer)" },
    ],
  },
  {
    section: "hero",
    title: "Hero Section — Photo Collage",
    description: "6 fashion images displayed in a tilted collage grid. Recommended: portrait 3:4 ratio.",
    slots: [
      { slot: "hero-1", label: "Image 1 (top-left)" },
      { slot: "hero-2", label: "Image 2 (top-center)" },
      { slot: "hero-3", label: "Image 3 (top-right)" },
      { slot: "hero-4", label: "Image 4 (bottom-left)" },
      { slot: "hero-5", label: "Image 5 (bottom-center)" },
      { slot: "hero-6", label: "Image 6 (bottom-right)" },
    ],
  },
  {
    section: "creators",
    title: "For Creators Section — Dashboard Mockup",
    description: "Profile photo and sample outfit shown in the dashboard card.",
    slots: [
      { slot: "creator-profile", label: "Creator Profile Photo (circle)" },
      { slot: "creator-outfit", label: "Sample Outfit Image" },
    ],
  },
  {
    section: "shoppers",
    title: "For Shoppers Section — Outfit Mockup",
    description: "Main outfit image and 6 grid thumbnails below it.",
    slots: [
      { slot: "shopper-main", label: "Main Outfit (phone mockup)" },
      { slot: "shopper-grid-1", label: "Grid 1" },
      { slot: "shopper-grid-2", label: "Grid 2" },
      { slot: "shopper-grid-3", label: "Grid 3" },
      { slot: "shopper-grid-4", label: "Grid 4" },
      { slot: "shopper-grid-5", label: "Grid 5" },
      { slot: "shopper-grid-6", label: "Grid 6" },
    ],
  },
  {
    section: "cta",
    title: "Footer CTA — Social Proof Avatars",
    description: "4 small profile photos shown as social proof circles.",
    slots: [
      { slot: "cta-avatar-1", label: "Avatar 1" },
      { slot: "cta-avatar-2", label: "Avatar 2" },
      { slot: "cta-avatar-3", label: "Avatar 3" },
      { slot: "cta-avatar-4", label: "Avatar 4" },
    ],
  },
];

export default function LandingImagesPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState<Record<string, LandingImage>>({});
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    checkAdminAndLoadImages();
  }, []);

  async function checkAdminAndLoadImages() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    // Check admin status
    const { data: creator } = await supabase
      .from("creators")
      .select("is_admin")
      .eq("auth_id", user.id)
      .single();

    const adminStatus = ADMIN_EMAILS.includes(user.email || "") || creator?.is_admin === true;
    setIsAdmin(adminStatus);

    if (adminStatus) {
      await loadImages();
    }

    setLoading(false);
  }

  async function loadImages() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("landing_images")
      .select("*")
      .order("display_order", { ascending: true });

    if (data) {
      const map: Record<string, LandingImage> = {};
      for (const img of data) {
        map[img.slot] = img;
      }
      setImages(map);
    }
  }

  async function handleUpload(section: string, slot: string, file: File) {
    setUploading(slot);
    setMessage(null);

    const supabase = createClient();

    try {
      // 1. Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop() || "jpg";
      const filePath = `${section}/${slot}-${Date.now()}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("landing-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
          contentType: file.type,
        });

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      // 2. Get public URL
      const { data: urlData } = supabase.storage
        .from("landing-images")
        .getPublicUrl(filePath);

      const imageUrl = urlData.publicUrl;

      // 3. Upsert into landing_images table
      const { error: dbError } = await supabase
        .from("landing_images")
        .upsert(
          {
            section,
            slot,
            image_url: imageUrl,
            alt_text: `${section} - ${slot}`,
            display_order: 0,
          },
          { onConflict: "section,slot" }
        );

      if (dbError) throw new Error(`Database error: ${dbError.message}`);

      // 4. Reload images
      await loadImages();
      setMessage({ type: "success", text: `✅ ${slot} updated successfully!` });
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Upload failed" });
    } finally {
      setUploading(null);
    }
  }

  async function handleDelete(slot: string) {
    if (!confirm(`Remove image from ${slot}?`)) return;

    setMessage(null);
    const supabase = createClient();

    const { error } = await supabase
      .from("landing_images")
      .delete()
      .eq("slot", slot);

    if (error) {
      setMessage({ type: "error", text: `Delete failed: ${error.message}` });
    } else {
      await loadImages();
      setMessage({ type: "success", text: `🗑️ ${slot} removed.` });
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="p-6">
        <h1 className="font-display text-2xl font-bold text-text-primary">Access Denied</h1>
        <p className="mt-2 text-text-secondary">This page is only accessible to administrators.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="font-display text-2xl font-bold text-text-primary">
        🖼️ Landing Page Images
      </h1>
      <p className="mt-2 text-sm text-text-secondary">
        Upload images for each section of the homepage. Changes appear instantly on the live site.
      </p>

      {/* Status message */}
      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm ${
          message.type === "success"
            ? "bg-green-500/10 text-green-400 border border-green-500/30"
            : "bg-red-500/10 text-red-400 border border-red-500/30"
        }`}>
          {message.text}
        </div>
      )}

      {/* Sections */}
      <div className="mt-8 space-y-10">
        {SLOT_CONFIG.map((sectionConfig) => (
          <div key={sectionConfig.section}>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              {sectionConfig.title}
            </h2>
            <p className="mt-1 text-xs text-text-secondary">{sectionConfig.description}</p>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {sectionConfig.slots.map(({ slot, label }) => {
                const img = images[slot];
                const isUploading = uploading === slot;

                return (
                  <div key={slot} className="space-y-2">
                    {/* Image preview */}
                    <div className="aspect-square rounded-md border border-border bg-surface-elevated overflow-hidden relative group">
                      {img ? (
                        <>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={img.image_url}
                            alt={img.alt_text || slot}
                            className="h-full w-full object-cover"
                          />
                          {/* Delete overlay on hover */}
                          <button
                            onClick={() => handleDelete(slot)}
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 text-xs font-medium"
                          >
                            🗑️ Remove
                          </button>
                        </>
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-text-secondary/30">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8">
                            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                            <circle cx="9" cy="9" r="2" />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>
                      )}
                      {/* Uploading overlay */}
                      {isUploading && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                          <span className="text-xs text-gold-accent animate-pulse">Uploading...</span>
                        </div>
                      )}
                    </div>

                    {/* Label */}
                    <p className="text-[11px] text-text-secondary truncate">{label}</p>

                    {/* Upload button */}
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleUpload(sectionConfig.section, slot, file);
                          e.target.value = ""; // Reset so same file can be re-uploaded
                        }}
                      />
                      <span className="block text-center text-[11px] font-medium text-gold-accent border border-gold-accent/30 py-1.5 rounded-sm cursor-pointer hover:bg-gold-accent/10 transition-colors">
                        {img ? "Replace" : "Upload"}
                      </span>
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
