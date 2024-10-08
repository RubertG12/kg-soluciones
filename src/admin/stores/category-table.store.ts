import { Category } from "@/core/types/db/db"
import { create, StateCreator } from "zustand"
import { getCategories } from "../services/categories.service"

interface CategoryTableState {
  categories: Category[]
  loading: boolean
  error?: string
  selectedCategories?: Category[]
  loadingDelete: boolean
  confirmDelete: boolean

  setLoadingDelete: (loadingDelete: boolean) => void
  setConfirmDelete: (confirmDelete: boolean) => void
  setSelectedCategories: (selectedCategories: Category[]) => void
  setError: (error: string | undefined) => void
  setLoading: (loading: boolean) => void
  setCategories: (categories: Category[]) => void
  deleteCategories: () => void
  editCategory: (category: Category) => void
  fetchCategories: () => Promise<void>
  addCategory: (category: Category) => void
}

const storeApi: StateCreator<CategoryTableState> = (set, get) => ({
  categories: [],
  loading: true,
  loadingDelete: false,
  error: undefined,
  selectedCategories: undefined,
  confirmDelete: false,

  setConfirmDelete: (confirmDelete) => set({ confirmDelete }),
  setLoading: (loading) => set({ loading }),
  setLoadingDelete: (loadingDelete) => set({ loadingDelete }),
  setCategories: (categories) => set({ categories }),
  setError: (error) => set({ error }),
  setSelectedCategories: (selectedCategories) => set({ selectedCategories }),

  deleteCategories: () => {
    const selectedCategories = get().selectedCategories

    if (!selectedCategories) return

    const categories = get().categories
    const newCategories = categories.filter((c) => !selectedCategories.includes(c))
    get().setSelectedCategories([])
    set({ categories: newCategories })
  },

  addCategory: (category) => {
    const categories = get().categories
    const newCategories = [...categories, category]
    set({ categories: newCategories })
  },

  editCategory: (category) => {
    const categories = get().categories
    const newCategories = categories.map((c) => {
      if (c.id === category.id) {
        return category
      }

      return c
    })
    set({ categories: newCategories })
  },

  fetchCategories: async () => {
    if (get().categories.length > 0) return

    get().setLoading(true)
    const { categories, error } = await getCategories()

    if (error) {
      get().setError(error)
    } else {
      get().setCategories(categories)
    }
    
    get().setLoading(false)
  }
})

export const useCategoryTableStore = create<CategoryTableState>()(
  storeApi
)