"use client"

import { toast } from "sonner"
import { LIMIT_SIZE, ProductForm, returnFileSize, updateProduct, useProductImagesFormStore } from "@/admin"
import { useRouter } from "next/navigation"
import { Timestamp } from "firebase/firestore"
import { Product } from "@/core/types/db/db"
import { useEffect } from "react"

interface Props {
  className?: string
  product: ProductInputs
  id: string
}

export const EditProductForm = ({
  className, product, id
}: Props) => {
  const images = useProductImagesFormStore(state => state.images)
  const totalSize = useProductImagesFormStore(state => state.totalSize)
  const setImages = useProductImagesFormStore(state => state.setImages)
  const initialImages = useProductImagesFormStore(state => state.initialImages)
  const router = useRouter()

  useEffect(() => {
    setImages([])

    return () => setImages([])
  }, [])

  const onSubmit = async (inputs: ProductInputs) => {
    if (images.length === 0) {
      toast.error('Debe subir al menos una imagen')
      return
    }

    if (totalSize() > LIMIT_SIZE) {
      toast.error(`Las imagenes no pueden superar los ${returnFileSize(LIMIT_SIZE)}`)
      return
    }

    const newProduct: Product = {
      ...inputs,
      description: inputs.description.split('\n').map(para => `<p>${para}</p>`).join(''),
      price: inputs.price ? parseInt(inputs.price) : undefined,
      id,
      images: images,
      createAt: Timestamp.now()
    }
    const { error, success } = await updateProduct(newProduct, initialImages)

    if (error) {
      toast.error(error)
    } else {
      toast.success(success)
      router.push('/administracion/productos')
    }
  }

  return (
    <ProductForm
      className={className}
      onSubmit={onSubmit}
      defaultValues={{
        ...product,
        description: product.description.replace(/<\/p>\s*<p>/g, '\n').replace(/<\/?p>/g, '')
      }}
    />
  )
}