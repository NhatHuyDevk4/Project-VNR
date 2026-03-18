import TaiLieuDetailPage from '@/features/tai-lieu/TaiLieuDetailPage';

export function generateStaticParams() {
  return [
    'bo-bo',
    'com-don-khoai',
    'dau-phu-tam-hanh',
    'rau-muong-nuoc-sau',
    'dua-cai-ca-phao',
    'ca-ro-ron-chien-gion',
    'hat-mit-luoc',
    'mam-kho-quet-com-chay',
    'cu-san-xao',
    'muoi-dau-phong',
  ].map((slug) => ({ slug }));
}

export default async function ContentSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TaiLieuDetailPage slug={slug} />;
}