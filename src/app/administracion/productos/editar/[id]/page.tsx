import { EditProductForm, ProductImagesForm } from "@/admin"
import { getProduct, PrincipalButton } from "@/core"

export const revalidate = 0
export const dynamic = "force-dynamic"

interface Props {
  params: {
    id: string
  }
}

async function EditProductPage({
  params: { id }
}: Props) {
  const { product, error } = await getProduct(id)

  if (!product || error) {
    return (
      <>
        <p className="text-text-200 text-sm lg:text-base mb-4">
          El producto con id <strong>{id}</strong> no existe :(
        </p>
        <PrincipalButton href="/administracion/productos">
          Volver
        </PrincipalButton>
      </>
    )
  }

  return (
    <section className="grid grid-cols-1 lg:grid-cols-[55%_auto] gap-6 items-start max-w-7xl">
      <EditProductForm
        id={product.id}
        product={{
          category: product.category,
          description: product.description,
          name: product.name,
          price: product.price ? product.price.toString() : undefined
        }}
      />
      <ProductImagesForm initialImages={product.images} />
    </section>
  )
}

export default EditProductPage