import { Categories, ProductsContainer, Searcher } from "@/catalog"
import { CategoriesSkeleton } from "@/catalog/components/categories-skeleton"
import { defaultUrl } from "@/core"
import { Metadata } from "next"
import { Suspense } from "react"

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Catálogo de productos - KG Soluciones",
  description: "Catálogo de productos y servicios de KG Soluciones. Aquí verás los productos que ofrecemos para ti. Servicios integrales de diseño, modelado e impresión 3D; fabricación y reparación de sistemas de alarma para vehículos y hogares; instalación de cámaras de seguridad, portones eléctricos y domótica; gestión de seguridad y salud en el trabajo; desarrollo y mantenimiento de sistemas automatizados; y soporte técnico en electrónica y electricidad automotriz.",
  keywords: ["catálogo", "diseño 3D", "modelado 3D", "impresión 3D", "ingeniería electromecánica", "fabricación de piezas plásticas", "sistemas de alarma vehicular", "sistemas de alarma hogar", "cámaras de seguridad", "portones eléctricos", "domótica", "seguridad en el trabajo", "automatización", "mantenimiento de sistemas automatizados", "reparación de tarjetas electrónicas", "electricidad automotriz"],
  openGraph: {
    title: "Catálogo de productos - KG Soluciones",
    description: "Catálogo de productos y servicios de KG Soluciones. Aquí verás los productos que ofrecemos para ti. Servicios integrales de diseño, modelado e impresión 3D; fabricación y reparación de sistemas de alarma para vehículos y hogares; instalación de cámaras de seguridad, portones eléctricos y domótica; gestión de seguridad y salud en el trabajo; desarrollo y mantenimiento de sistemas automatizados; y soporte técnico en electrónica y electricidad automotriz.",
    siteName: "Catálogo de productos - KG Soluciones",
    locale: "es-ES",
    type: "website"
  }
}

interface Props {
  searchParams: { [key: string]: string | undefined }
}

function CatalogPage({
  searchParams
}: Props) {
  return (
    <>
      <header className="mt-20 flex flex-col items-center justify-center gap-4">
        <Searcher searchParams={searchParams} />
        <Suspense fallback={<CategoriesSkeleton />}>
          <Categories />
        </Suspense>
      </header>
      <ProductsContainer
        searchParams={searchParams}
        className="mt-7 lg:mt-12"
      />
    </>
  )
}

export default CatalogPage