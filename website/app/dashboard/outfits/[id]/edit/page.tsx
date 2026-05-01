"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { siteConfig } from "@/lib/config";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Toggle } from "@/components/ui/Toggle";
import { sanitizeText, isValidUrl } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import type { ProductFormData } from "@/lib/types";

/**
 * Edit Outfit Page
 * ================
 * Route: /dashboard/outfits/[id]/edit
 * Pre-fills form with existing outfit data.
 * Note: In-stock toggle is available on edit (to manage existing products).
 * Product images can be updated. Price is optional.
 */

const emptyProduct: ProductFormData = {
  name: "",
  platform: "Amazon",
  affiliate_url: "",
  price: "",
  image_file: null,
  image_url: "",
  in_stock: true,
};

export default function EditOutfitPage() {
  const router = useRouter();
  const params = useParams();
  const outfitId = params.id as string;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(true);
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [creatorUsername, setCreatorUsername] = useState("");

  // Load existing outfit data
  useEffect(() => {
    async function loadOutfit() {
      const supabase = createClient();

      // Get creator username for links
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
      const { data: creator } = await supabase
        .from("creators")
          .select("username")
        .eq("auth_id", user.id)
        .single();
        if (creator) setCreatorUsername(creator.username);
      }

      const { data: outfit, error: outfitError } = await supabase
        .from("outfits")
        .select("*")
        .eq("id", outfitId)
        .single();

      if (outfitError || !outfit) {
        setError("Outfit not found");
        setIsPageLoading(false);
        return;
      }

      // Fetch products separately (RLS compatibility)
      const { data: productsData } = await supabase
        .from("products")
        .select("*")
        .eq("outfit_id", outfitId)
        .order("display_order", { ascending: true });

      setTitle(outfit.title);
      setCategory(outfit.category);
      setExistingImageUrl(outfit.image_url);
      setImagePreview(outfit.image_url);
      setIsPublished(outfit.is_published);

      const existingProducts: ProductFormData[] = (productsData || []).map((p: any) => ({
        id: p.id,
        name: p.name,
          platform: p.platform,
          affiliate_url: p.affiliate_url,
        price: p.price || "",
        image_url: p.image_url || "",
        image_file: null,
          in_stock: p.in_stock,
        }));

      setProducts(
        existingProducts.length > 0 ? existingProducts : [{ ...emptyProduct }]
      );
      setIsPageLoading(false);
    }

    loadOutfit();
  }, [outfitId]);

  const addProduct = () => {
    if (products.length >= siteConfig.maxProductsPerOutfit) return;
    setProducts([...products, { ...emptyProduct }]);
  };

  const removeProduct = (index: number) => {
    if (products.length <= 1) return;
    setProducts(products.filter((_, i) => i !== index));
  };

  const updateProduct = (index: number, field: keyof ProductFormData, value: string | boolean | File | null) => {
    const updated = [...products];
    updated[index] = { ...updated[index], [field]: value };
    setProducts(updated);
  };

  const handleProductImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Product image must be JPG, PNG, or WEBP");
      return;
    }

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      });
      // Update both fields at once to avoid state batching issues
      const updated = [...products];
      updated[index] = {
        ...updated[index],
        image_file: compressed,
        image_url: URL.createObjectURL(compressed),
      };
      setProducts(updated);
      setError("");
    } catch {
      setError("Failed to process product image");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WEBP image");
      return;
    }

    if (file.size > siteConfig.maxImageSizeMB * 1024 * 1024) {
      setError(`Image must be under ${siteConfig.maxImageSizeMB}MB`);
      return;
    }
    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: siteConfig.targetImageSizeKB / 1024,
        maxWidthOrHeight: 1200,
        useWebWorker: true,
      });
      setImageFile(compressed);
      setImagePreview(URL.createObjectURL(compressed));
      setError("");
    } catch {
      setError("Failed to process image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validate
    if (!title.trim()) { setError("Title required"); setIsLoading(false); return; }
    if (!category) { setError("Category required"); setIsLoading(false); return; }
    if (!imagePreview) { setError("Image required"); setIsLoading(false); return; }

    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      if (!p.name.trim()) { setError(`Product ${i+1}: Name required`); setIsLoading(false); return; }
      if (!p.affiliate_url.trim() || !isValidUrl(p.affiliate_url)) { setError(`Product ${i+1}: Valid URL required`); setIsLoading(false); return; }
    }

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError("Session expired"); setIsLoading(false); return; }

      const { data: creator } = await supabase
        .from("creators")
        .select("id, username")
        .eq("auth_id", user.id)
        .single();
      if (!creator) { setError("Creator not found"); setIsLoading(false); return; }

      // Handle outfit image upload if new image
      let finalImageUrl = existingImageUrl;
      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${creator.id}/${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("outfit-images")
          .upload(fileName, imageFile);
        if (uploadError) { setError("Image upload failed"); setIsLoading(false); return; }
        const { data: { publicUrl } } = supabase.storage
          .from("outfit-images")
          .getPublicUrl(fileName);
        finalImageUrl = publicUrl;
      }

      // Update outfit
      const { error: updateError } = await supabase
        .from("outfits")
        .update({
          title: sanitizeText(title),
          category,
          image_url: finalImageUrl,
          is_published: isPublished,
          updated_at: new Date().toISOString(),
        })
        .eq("id", outfitId);

      if (updateError) { setError("Failed to update outfit"); setIsLoading(false); return; }

      // Delete existing products and re-insert
      await supabase.from("products").delete().eq("outfit_id", outfitId);

      // Upload product images and insert products
      const productRows = [];
      for (let i = 0; i < products.length; i++) {
        const p = products[i];
        let productImageUrl: string | null = p.image_url || null;

        // Upload new product image if file exists
        if (p.image_file) {
          const prodFile = p.image_file as File;
          const prodFileExt = prodFile.name?.split(".").pop() || prodFile.type?.split("/").pop() || "jpg";
          const prodFileName = `${creator.id}/products/${outfitId}_${i}_${Date.now()}.${prodFileExt}`;

          const { error: prodUploadError } = await supabase.storage
            .from("outfit-images")
            .upload(prodFileName, prodFile, {
              contentType: prodFile.type || "image/jpeg",
            });

          if (!prodUploadError) {
            const { data: { publicUrl: prodUrl } } = supabase.storage
              .from("outfit-images")
              .getPublicUrl(prodFileName);
            productImageUrl = prodUrl;
          }
        }

        // If image_url is still a blob URL (upload didn't happen or failed), clear it
        if (productImageUrl && productImageUrl.startsWith("blob:")) {
          productImageUrl = null;
        }

        productRows.push({
          outfit_id: outfitId,
          name: sanitizeText(p.name),
          platform: p.platform,
          affiliate_url: p.affiliate_url.trim(),
          price: p.price ? sanitizeText(p.price) : "",
          image_url: productImageUrl,
          display_order: i,
          in_stock: p.in_stock,
        });
      }

      await supabase.from("products").insert(productRows);

      // Stay on page and show success message with navigation options
      setSuccess("Outfit saved successfully!");
      setCreatorUsername(creator.username);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this outfit? This cannot be undone.")) return;
    setIsDeleting(true);

    try {
      const supabase = createClient();
      await supabase.from("outfits").delete().eq("id", outfitId);
      window.location.href = "/dashboard";
    } catch {
      setError("Failed to delete outfit");
    } finally {
      setIsDeleting(false);
    }
  };

  const categoryOptions = siteConfig.categories
    .filter((c) => c !== "All")
    .map((c) => ({ value: c, label: c }));

  const platformOptions = siteConfig.platforms.map((p) => ({ value: p, label: p }));

  if (isPageLoading) {
    return (
      <div className="mx-auto max-w-2xl animate-pulse space-y-4">
        <div className="h-8 w-48 bg-border" />
        <div className="h-4 w-32 bg-border" />
        <div className="h-64 bg-border" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-primary-dark">
            Edit Outfit
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Update your outfit details and products
          </p>
        </div>
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          isLoading={isDeleting}
        >
          Delete Outfit
        </Button>
      </div>

      {/* Success message with navigation */}
      {success && (
        <div className="mt-4 border border-green-200 bg-green-50 p-4">
          <p className="text-sm font-medium text-green-700">{success}</p>
          <div className="mt-3 flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-xs font-medium text-green-700 underline hover:text-green-900"
                >
              ← Back to Overview
            </Link>
            {creatorUsername && (
              <a
                href={`/${creatorUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-medium text-green-700 underline hover:text-green-900"
              >
                View Storefront →
              </a>
            )}
          </div>
        </div>
            )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        {/* Title */}
        <Input
          label="Outfit Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Navy Corporate Chic"
          maxLength={siteConfig.maxOutfitTitleLength}
          helperText={`${title.length}/${siteConfig.maxOutfitTitleLength}`}
                    required
                  />

        {/* Category */}
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          options={categoryOptions}
          placeholder="Select a category"
                    required
                  />

        {/* Image */}
        <div>
          <label className="mb-1.5 block text-sm font-medium text-text-primary">
            Outfit Image
          </label>
          <div className="border border-dashed border-border p-4">
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mx-auto max-h-48 object-contain"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                    setExistingImageUrl(null);
                  }}
                  className="absolute right-0 top-0 bg-red-600 px-2 py-1 text-xs text-white"
                >
                  Change
                </button>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center gap-2 py-6">
                <span className="text-2xl">📷</span>
                <span className="text-sm text-text-secondary">
                  Click to upload
                </span>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>

        {/* Products */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <label className="text-sm font-medium text-text-primary">
              Products ({products.length}/{siteConfig.maxProductsPerOutfit})
            </label>
            {products.length < siteConfig.maxProductsPerOutfit && (
              <Button type="button" variant="ghost" size="sm" onClick={addProduct}>
                + Add Product
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {products.map((product, index) => (
              <div key={index} className="border border-border bg-surface p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-text-secondary">
                    Product {index + 1}
                  </span>
                  <div className="flex items-center gap-3">
                    <Toggle
                      enabled={product.in_stock}
                      onChange={(val) => updateProduct(index, "in_stock", val)}
                      label={product.in_stock ? "In Stock" : "Out of Stock"}
                      size="sm"
                    />
                    {products.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                </div>
    </div>

                {/* Product Image */}
                <div>
                  <label className="mb-1 block text-xs font-medium text-text-secondary">
                    Product Image (optional)
                  </label>
        <div className="flex items-center gap-3">
                    {product.image_url ? (
                      <div className="relative h-16 w-16 border border-border overflow-hidden">
                        <img
                          src={product.image_url}
                          alt="Product"
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...products];
                            updated[index] = { ...updated[index], image_file: null, image_url: "" };
                            setProducts(updated);
                          }}
                          className="absolute -right-1 -top-1 bg-red-600 h-4 w-4 flex items-center justify-center text-[8px] text-white rounded-full"
                        >
                          ×
                        </button>
        </div>
                    ) : (
                      <label className="flex h-16 w-16 cursor-pointer items-center justify-center border border-dashed border-border bg-background text-text-secondary hover:border-gold-accent transition-colors">
                        <span className="text-lg">+</span>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(e) => handleProductImageChange(index, e)}
                          className="hidden"
                        />
                      </label>
                    )}
                    <span className="text-[10px] text-text-secondary">
                      Square image recommended
                    </span>
    </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Input
                    label="Product Name"
                    value={product.name}
                    onChange={(e) => updateProduct(index, "name", e.target.value)}
                    placeholder="Navy Wide Leg Palazzo"
                    required
                  />
                  <Select
                    label="Platform"
                    value={product.platform}
                    onChange={(e) => updateProduct(index, "platform", e.target.value)}
                    options={platformOptions}
                  />
                  <Input
                    label="Affiliate URL"
                    value={product.affiliate_url}
                    onChange={(e) => updateProduct(index, "affiliate_url", e.target.value)}
                    placeholder="https://amzn.to/abc123"
                    type="url"
                    required
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center gap-4 border border-border bg-surface p-4">
          <Toggle enabled={isPublished} onChange={setIsPublished} />
          <div>
            <p className="text-sm font-medium text-text-primary">
              {isPublished ? "Published" : "Draft"}
            </p>
            <p className="text-xs text-text-secondary">
              {isPublished
                ? "Visible on your storefront"
                : "Hidden from public view"}
            </p>
          </div>
        </div>

        {error && (
          <div className="border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button type="submit" variant="primary" size="lg" isLoading={isLoading}>
            Save Changes
          </Button>
          <Link href="/dashboard">
            <Button type="button" variant="ghost" size="lg">
              ← Overview
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}

