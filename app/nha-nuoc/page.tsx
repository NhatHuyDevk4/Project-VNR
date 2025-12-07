import MainLayout from "@/components/layouts/MainLayout";
import NhaNuocPresentation from "@/components/NhaNuocPresentation";
import contentData from "@/data/nha-nuoc-content.json";

export default function NhaNuocPage() {
  return (
    <MainLayout>
      <NhaNuocPresentation data={contentData} />
    </MainLayout>
  );
}
