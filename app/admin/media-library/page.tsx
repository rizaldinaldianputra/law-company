import { getMediaObjects } from "../actions"
import { MediaLibrary } from "@/components/admin/media/MediaLibrary"

export default async function MediaLibraryPage() {
  const objects = await getMediaObjects()

  return (
    <div className="p-8">
      <MediaLibrary initialObjects={objects} />
    </div>
  )
}
