"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { isValidUsername, sanitizeText } from "@/lib/utils";
import imageCompression from "browser-image-compression";

/**
 * Creator Profile Settings Page
 * =============================
 * Route: /dashboard/settings
 * Edit: display name, username, bio, social handles (Instagram, YouTube, Facebook, Pinterest), profile photo.
 */
export default function SettingsPage() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [originalUsername, setOriginalUsername] = useState("");
  const [bio, setBio] = useState("");
  const [instagramHandle, setInstagramHandle] = useState("");
  const [youtubeHandle, setYoutubeHandle] = useState("");
  const [facebookHandle, setFacebookHandle] = useState("");
  const [pinterestHandle, setPinterestHandle] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: creator } = await supabase
        .from("creators")
        .select("*")
        .eq("auth_id", user.id)
        .single();

      if (creator) {
        setDisplayName(creator.display_name || "");
        setUsername(creator.username);
        setOriginalUsername(creator.username);
        setBio(creator.bio || "");
        setInstagramHandle(creator.instagram_handle || "");
        setYoutubeHandle(creator.youtube_handle || "");
        setFacebookHandle(creator.facebook_handle || "");
        setPinterestHandle(creator.pinterest_handle || "");
        setProfileImageUrl(creator.profile_image_url);
        setProfileImagePreview(creator.profile_image_url);
      }
      setIsPageLoading(false);
    }
    loadProfile();
  }, []);

  const checkUsername = async (value: string) => {
    const lower = value.toLowerCase();
    setUsername(lower);

    if (lower === originalUsername) {
      setUsernameAvailable(null);
      return;
    }
    if (!isValidUsername(lower)) {
      setUsernameAvailable(null);
      return;
    }

    const supabase = createClient();
    const { data } = await supabase
      .from("creators")
      .select("username")
      .eq("username", lower)
      .single();

    setUsernameAvailable(!data);
  };

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image");
      return;
    }

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      });
      setProfileImageFile(compressed);
      setProfileImagePreview(URL.createObjectURL(compressed));
      setError("");
    } catch {
      setError("Failed to process image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!displayName.trim()) {
      setError("Display name is required");
      setIsLoading(false);
      return;
    }
    if (!isValidUsername(username)) {
      setError("Invalid username format");
      setIsLoading(false);
      return;
    }
    if (username !== originalUsername && usernameAvailable === false) {
      setError("Username is taken");
      setIsLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError("Session expired"); setIsLoading(false); return; }

      const { data: creator } = await supabase
        .from("creators")
        .select("id")
        .eq("auth_id", user.id)
        .single();
      if (!creator) { setError("Creator not found"); setIsLoading(false); return; }

      // Upload new profile image if changed
      let finalImageUrl = profileImageUrl;
      if (profileImageFile) {
        const fileExt = profileImageFile.name.split(".").pop();
        const fileName = `${creator.id}/profile.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("profile-photos")
          .upload(fileName, profileImageFile, { upsert: true });
        if (uploadError) { setError("Image upload failed"); setIsLoading(false); return; }
        const { data: { publicUrl } } = supabase.storage
          .from("profile-photos")
          .getPublicUrl(fileName);
        finalImageUrl = publicUrl;
      }

      // Update creator profile
      const { error: updateError } = await supabase
        .from("creators")
        .update({
          display_name: sanitizeText(displayName),
          username,
          bio: sanitizeText(bio),
          instagram_handle: sanitizeText(instagramHandle) || null,
          youtube_handle: sanitizeText(youtubeHandle) || null,
          facebook_handle: sanitizeText(facebookHandle) || null,
          pinterest_handle: sanitizeText(pinterestHandle) || null,
          profile_image_url: finalImageUrl,
        })
        .eq("id", creator.id);

      if (updateError) {
        if (updateError.message.includes("unique")) {
          setError("Username is already taken");
        } else {
          setError(updateError.message);
        }
        setIsLoading(false);
        return;
      }

      setOriginalUsername(username);
      setSuccess("Profile updated successfully!");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="mx-auto max-w-lg animate-pulse space-y-4">
        <div className="h-8 w-32 bg-border" />
        <div className="h-64 bg-border" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="font-display text-2xl font-bold text-primary-dark">
        Profile Settings
      </h1>
      <p className="mt-1 text-sm text-text-secondary">
        Customize how you appear on your storefront
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Profile Photo */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-primary">
            Profile Photo
          </label>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-border">
              {profileImagePreview ? (
                <img
                  src={profileImagePreview}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-border text-xl text-text-secondary">
                  {displayName.charAt(0).toUpperCase() || "?"}
                </div>
              )}
            </div>
            <label className="cursor-pointer border border-border px-3 py-1.5 text-sm text-text-primary hover:bg-background transition-colors">
              Change Photo
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Display Name */}
        <Input
          label="Display Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Priya Sharma"
          required
        />

        {/* Username */}
        <div>
          <Input
            label="Username"
            value={username}
            onChange={(e) => checkUsername(e.target.value)}
            placeholder="priya_styles"
            helperText={`Your storefront: ${siteConfig.url}/${username}`}
            error={
              username && !isValidUsername(username)
                ? "3-20 chars, lowercase, letters/numbers/underscores"
                : undefined
            }
          />
          {username !== originalUsername && usernameAvailable === true && isValidUsername(username) && (
            <p className="mt-1 text-xs text-green-600">✓ Available</p>
          )}
          {username !== originalUsername && usernameAvailable === false && (
            <p className="mt-1 text-xs text-red-600">✗ Taken</p>
          )}
          {username !== originalUsername && isValidUsername(username) && (
            <p className="mt-1 text-xs text-yellow-600">
              ⚠️ Changing username will break old links to your storefront
            </p>
          )}
        </div>

        {/* Bio */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-primary">
            Bio
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Fashion creator sharing everyday looks"
            maxLength={siteConfig.maxBioLength}
            rows={2}
            className="w-full border border-border bg-surface px-3 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-gold-accent focus:outline-none focus:ring-1 focus:ring-gold-accent resize-none"
          />
          <p className="mt-1 text-xs text-text-secondary">
            {bio.length}/{siteConfig.maxBioLength}
          </p>
        </div>

        {/* Social Handles */}
        <div className="space-y-4">
          <p className="text-sm font-medium text-text-primary">Social Handles</p>
          <Input
            label="Instagram"
            value={instagramHandle}
            onChange={(e) => setInstagramHandle(e.target.value)}
            placeholder="priya_styles"
            helperText="Without the @ symbol"
          />
          <Input
            label="YouTube"
            value={youtubeHandle}
            onChange={(e) => setYoutubeHandle(e.target.value)}
            placeholder="PriyaStyles"
            helperText="Your YouTube channel name"
          />
          <Input
            label="Facebook"
            value={facebookHandle}
            onChange={(e) => setFacebookHandle(e.target.value)}
            placeholder="priya.styles"
            helperText="Your Facebook page name"
          />
          <Input
            label="Pinterest"
            value={pinterestHandle}
            onChange={(e) => setPinterestHandle(e.target.value)}
            placeholder="priyastyles"
            helperText="Your Pinterest username"
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        {success && (
          <div className="border border-green-200 bg-green-50 p-3">
            <p className="text-sm text-green-700">{success}</p>
          </div>
        )}

        {/* Submit */}
        <Button type="submit" variant="primary" size="lg" isLoading={isLoading}>
          Save Changes
        </Button>
      </form>
    </div>
  );
}
