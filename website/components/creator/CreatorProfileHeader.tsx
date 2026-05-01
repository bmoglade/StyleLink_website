import type { CreatorProfile } from "@/lib/types";

interface CreatorProfileHeaderProps {
  creator: CreatorProfile;
}

/**
 * Creator Profile Header
 * ======================
 * Top section of the public storefront page.
 * Shows: photo, name, bio, social handles (Instagram, YouTube, Facebook, Pinterest), stats.
 * Uses <img> instead of next/image (corporate proxy compatibility).
 */
export function CreatorProfileHeader({ creator }: CreatorProfileHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 sm:flex-row sm:items-start sm:gap-6">
      {/* Profile Photo */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-border sm:h-24 sm:w-24">
        {creator.profile_image_url ? (
          <img
            src={creator.profile_image_url}
            alt={creator.display_name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-border text-2xl text-text-secondary">
            {creator.display_name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 text-center sm:text-left">
        {/* Name */}
        <h1 className="font-display text-2xl font-bold text-primary-dark sm:text-3xl">
          {creator.display_name}
        </h1>

        {/* Social Handles */}
        <div className="mt-1 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
          {creator.instagram_handle && (
            <a
              href={`https://instagram.com/${creator.instagram_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-gold-accent transition-colors"
            >
              @{creator.instagram_handle}
            </a>
          )}
          {creator.youtube_handle && (
            <a
              href={`https://youtube.com/@${creator.youtube_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-gold-accent transition-colors"
            >
              YouTube
            </a>
          )}
          {creator.facebook_handle && (
            <a
              href={`https://facebook.com/${creator.facebook_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-gold-accent transition-colors"
            >
              Facebook
            </a>
          )}
          {creator.pinterest_handle && (
            <a
              href={`https://pinterest.com/${creator.pinterest_handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary hover:text-gold-accent transition-colors"
            >
              Pinterest
            </a>
          )}
        </div>

        {/* Bio */}
        {creator.bio && (
          <p className="mt-2 text-sm text-text-secondary">{creator.bio}</p>
        )}

        {/* Stats */}
        <div className="mt-3 flex items-center justify-center gap-6 sm:justify-start">
          <div className="text-center sm:text-left">
            <span className="text-lg font-bold text-primary-dark">
              {creator.outfit_count}
            </span>
            <span className="ml-1 text-xs text-text-secondary">
              {creator.outfit_count === 1 ? "Look" : "Looks"}
            </span>
          </div>
          <div className="text-center sm:text-left">
            <span className="text-lg font-bold text-primary-dark">
              {creator.product_count}
            </span>
            <span className="ml-1 text-xs text-text-secondary">
              {creator.product_count === 1 ? "Product" : "Products"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
