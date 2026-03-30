"use client"

import { useEffect, useRef, useState } from "react"
import { useAuth } from "@/lib/auth-store"
import { RoleGuard } from "@/components/auth/role-guard"
import { materialsService } from "@/service/materials/materials.service"
import type { Material } from "@/lib/types/material"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  FileText,
  Presentation,
  Video,
  Search,
  Download,
  Upload,
  Eye,
  Filter,
  FolderOpen,
  Lock,
  XCircle,
  FileUp,
  Trash2,
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

type MaterialType = "pdf" | "slides" | "video"
type AccessLevel = "all" | "department" | "specific"

type UIMaterial = Material & {
  fileUrl?: string
  originalFileName?: string
}

const typeConfig = {
  pdf: {
    icon: FileText,
    label: "PDF",
    color: "bg-destructive/10 text-destructive",
  },
  slides: {
    icon: Presentation,
    label: "Slides",
    color: "bg-wtms-orange/10 text-wtms-orange",
  },
  video: {
    icon: Video,
    label: "Video",
    color: "bg-primary/10 text-primary",
  },
}

const accessConfig = {
  all: {
    label: "All Users",
    color: "bg-wtms-green/10 text-wtms-green border-0",
  },
  department: {
    label: "Department Only",
    color: "bg-wtms-teal/10 text-wtms-teal border-0",
  },
  specific: {
    label: "Authorized Only",
    color: "bg-wtms-orange/10 text-wtms-orange border-0",
  },
}

function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

function inferMaterialType(file: File): MaterialType {
  const name = file.name.toLowerCase()

  if (file.type === "application/pdf" || name.endsWith(".pdf")) {
    return "pdf"
  }

  if (
    name.endsWith(".ppt") ||
    name.endsWith(".pptx") ||
    name.endsWith(".key") ||
    file.type.includes("presentation")
  ) {
    return "slides"
  }

  return "video"
}

function isValidFileForType(file: File, selectedType: MaterialType) {
  const name = file.name.toLowerCase()

  if (selectedType === "pdf") {
    return file.type === "application/pdf" || name.endsWith(".pdf")
  }

  if (selectedType === "slides") {
    return (
      name.endsWith(".ppt") ||
      name.endsWith(".pptx") ||
      name.endsWith(".key") ||
      file.type.includes("presentation")
    )
  }

  if (selectedType === "video") {
    return file.type.startsWith("video/")
  }

  return false
}

function MaterialsPageContent() {
  const { user } = useAuth()

  const [materials, setMaterials] = useState<UIMaterial[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState<"all" | MaterialType>("all")
  const [showUpload, setShowUpload] = useState(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const createdUrlsRef = useRef<Set<string>>(new Set())

  const isAdmin = user?.role === "admin"
  const isTrainer = user?.role === "trainer"
  const isEmployee = user?.role === "employee"
  const canManageMaterials = isAdmin || isTrainer

  // Load materials on mount
  useEffect(() => {
    loadMaterials()
  }, [])

  const loadMaterials = async () => {
    try {
      setLoading(true)
      const data = await materialsService.getAll()
      setMaterials(data as UIMaterial[])
    } catch (error) {
      toast.error("Failed to load materials")
    } finally {
      setLoading(false)
    }
  }

  const filtered = materials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(search.toLowerCase()) ||
      m.sessionTitle.toLowerCase().includes(search.toLowerCase())

    const matchesType = typeFilter === "all" || m.type === typeFilter
    return matchesSearch && matchesType
  })

  const grouped = filtered.reduce<Record<string, UIMaterial[]>>((acc, m) => {
    if (!acc[m.sessionTitle]) acc[m.sessionTitle] = []
    acc[m.sessionTitle].push(m)
    return acc
  }, {})

  function resetUploadState() {
    setSelectedFile(null)
    setDragging(false)
    setUploadError("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function handleOpenChange(open: boolean) {
    setShowUpload(open)
    if (!open) {
      resetUploadState()
    }
  }

  function handleSelectedFile(file: File | null, selectedType?: MaterialType) {
    if (!file) return

    const maxSize = 500 * 1024 * 1024
    if (file.size > maxSize) {
      setUploadError("File size must be 500MB or smaller.")
      return
    }

    if (selectedType && !isValidFileForType(file, selectedType)) {
      setUploadError(`Selected file does not match the chosen type: ${selectedType.toUpperCase()}.`)
      return
    }

    setUploadError("")
    setSelectedFile(file)
  }

  function handleFileInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    selectedType?: MaterialType
  ) {
    const file = e.target.files?.[0] || null
    handleSelectedFile(file, selectedType)
  }

  function handleDrop(
    e: React.DragEvent<HTMLDivElement>,
    selectedType?: MaterialType
  ) {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)

    const file = e.dataTransfer.files?.[0] || null
    handleSelectedFile(file, selectedType)
  }

  function handleView(material: UIMaterial) {
    if (!material.fileUrl) return
    window.open(material.fileUrl, "_blank", "noopener,noreferrer")
  }

  function handleDownload(material: UIMaterial) {
    if (!material.fileUrl) return

    const a = document.createElement("a")
    a.href = material.fileUrl
    a.download = material.originalFileName || material.title
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  function handleDelete(material: UIMaterial) {
    if (material.fileUrl && createdUrlsRef.current.has(material.fileUrl)) {
      URL.revokeObjectURL(material.fileUrl)
      createdUrlsRef.current.delete(material.fileUrl)
    }

    setMaterials((prev) => prev.filter((m) => m.id !== material.id))
  }

  function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!canManageMaterials) return

    const fd = new FormData(e.currentTarget)

    const title = (fd.get("title") as string)?.trim()
    const session = (fd.get("session") as string)?.trim()
    const type = ((fd.get("type") as string) || "pdf") as MaterialType
    const access = ((fd.get("access") as string) || "all") as AccessLevel

    if (!title || !session) {
      setUploadError("Please fill in all required fields.")
      return
    }

    if (!selectedFile) {
      setUploadError("Please choose a file first.")
      return
    }

    if (!isValidFileForType(selectedFile, type)) {
      setUploadError(`The file does not match the selected type: ${type.toUpperCase()}.`)
      return
    }

    const blobUrl = URL.createObjectURL(selectedFile)
    createdUrlsRef.current.add(blobUrl)

    const newMaterial: UIMaterial = {
      id: `m${Date.now()}`,
      title,
      type,
      sessionId: "s1",
      sessionTitle: session,
      uploadedBy: user?.name || "Unknown User",
      uploadedAt: new Date().toISOString().split("T")[0],
      size: formatFileSize(selectedFile.size),
      accessLevel: access,
      fileUrl: blobUrl,
      originalFileName: selectedFile.name,
    }

    setMaterials((prev) => [newMaterial, ...prev])
    setShowUpload(false)
    resetUploadState()
  }

  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((url) => URL.revokeObjectURL(url))
      createdUrlsRef.current.clear()
    }
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Training Materials</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {canManageMaterials
              ? "Upload, organize, and manage access to training materials."
              : "Browse and download training materials."}
          </p>
        </div>

        {canManageMaterials && (
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <FolderOpen className="size-4" />
              Organize by Dept.
            </Button>

            <Button onClick={() => setShowUpload(true)} className="gap-2">
              <Upload className="size-4" />
              Upload Material
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="size-4 text-muted-foreground" />
          {(["all", "pdf", "slides", "video"] as const).map((f) => (
            <Button
              key={f}
              variant={typeFilter === f ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(f)}
              className="capitalize text-xs"
            >
              {f === "all" ? "All" : typeConfig[f].label}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton className="size-10 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-12" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                  <Skeleton className="h-3 w-1/2" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-20" />
                    <div className="flex gap-1">
                      <Skeleton className="size-7" />
                      <Skeleton className="size-7" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : Object.entries(grouped).length === 0 ? (
        <div className="py-16 text-center">
          <FileText className="mx-auto size-10 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No materials found.</p>
        </div>
      ) : (
        Object.entries(grouped).map(([session, mats]) => (
          <div key={session} className="space-y-3">
            <div className="flex items-center gap-2">
              <FolderOpen className="size-4 text-primary" />
              <h2 className="text-sm font-semibold text-foreground">{session}</h2>
              <Badge variant="secondary" className="text-[10px]">
                {mats.length} files
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {mats.map((material) => {
                const cfg = typeConfig[material.type]
                const acfg = accessConfig[material.accessLevel]
                const TypeIcon = cfg.icon
                const canOpen = !!material.fileUrl

                return (
                  <Card key={material.id} className="transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${cfg.color}`}
                        >
                          <TypeIcon className="size-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-foreground">
                            {material.title}
                          </p>

                          <div className="mt-1 flex items-center gap-2">
                            <Badge className={`border-0 text-[10px] ${cfg.color}`}>
                              {cfg.label}
                            </Badge>
                            <span className="text-[10px] text-muted-foreground">
                              {material.size}
                            </span>
                          </div>

                          {material.originalFileName && (
                            <p className="mt-1 truncate text-[10px] text-muted-foreground">
                              {material.originalFileName}
                            </p>
                          )}

                          <div className="mt-3 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Lock className="size-3 text-muted-foreground" />
                              <Badge className={`text-[10px] ${acfg.color}`}>
                                {acfg.label}
                              </Badge>
                            </div>

                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={() => handleView(material)}
                                disabled={!canOpen}
                              >
                                <Eye className="size-3.5" />
                                <span className="sr-only">View</span>
                              </Button>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="size-7"
                                onClick={() => handleDownload(material)}
                                disabled={!canOpen}
                              >
                                <Download className="size-3.5" />
                                <span className="sr-only">Download</span>
                              </Button>

                              {canManageMaterials && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-7 text-destructive hover:text-destructive"
                                  onClick={() => handleDelete(material)}
                                >
                                  <XCircle className="size-3.5" />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              )}
                            </div>
                          </div>

                          <p className="mt-2 text-[10px] text-muted-foreground">
                            By {material.uploadedBy} &middot;{" "}
                            {new Date(material.uploadedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))
      )}

      {canManageMaterials && (
        <Dialog open={showUpload} onOpenChange={handleOpenChange}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-foreground">Upload Training Material</DialogTitle>
              <DialogDescription>
                Upload documents, slides, or videos for training sessions.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleUpload} className="mt-2 space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground">Title</Label>
                <Input
                  name="title"
                  required
                  placeholder="e.g. Cybersecurity Handbook"
                  defaultValue={selectedFile ? selectedFile.name.replace(/\.[^/.]+$/, "") : ""}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-foreground">Type</Label>
                  <select
                    name="type"
                    defaultValue={selectedFile ? inferMaterialType(selectedFile) : "pdf"}
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="pdf">PDF</option>
                    <option value="slides">Slides</option>
                    <option value="video">Video</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Access Level</Label>
                  <select
                    name="access"
                    defaultValue="all"
                    className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
                  >
                    <option value="all">All Users</option>
                    <option value="department">Department Only</option>
                    <option value="specific">Authorized Only</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Session</Label>
                <Input
                  name="session"
                  required
                  placeholder="e.g. Cybersecurity Fundamentals"
                />
              </div>

              <div className="space-y-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.ppt,.pptx,video/*"
                  className="hidden"
                  onChange={(e) => {
                    const form = e.currentTarget.form
                    const typeField = form?.elements.namedItem("type") as HTMLSelectElement | null
                    const selectedType = (typeField?.value || "pdf") as MaterialType
                    handleFileInputChange(e, selectedType)
                  }}
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setDragging(true)
                  }}
                  onDragEnter={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setDragging(true)
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setDragging(false)
                  }}
                  onDrop={(e) => {
                    const form = e.currentTarget.closest("form")
                    const typeField = form?.elements.namedItem("type") as HTMLSelectElement | null
                    const selectedType = (typeField?.value || "pdf") as MaterialType
                    handleDrop(e, selectedType)
                  }}
                  className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition ${
                    dragging
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/30"
                  }`}
                >
                  <FileUp className="mx-auto size-8 text-muted-foreground/40" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag and drop or click to upload
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground/60">
                    PDF, PPT, PPTX, MP4 up to 500MB
                  </p>
                </div>

                {selectedFile && (
                  <div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">
                        {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={resetUploadState}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                )}

                {uploadError && (
                  <p className="text-sm font-medium text-destructive">{uploadError}</p>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit">Upload</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default function MaterialsPage() {
  return (
    <RoleGuard allowed={["admin", "trainer", "employee"]}>
      <MaterialsPageContent />
    </RoleGuard>
  )
}