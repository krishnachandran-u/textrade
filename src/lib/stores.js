import { create } from 'zustand'

export const useCartStore= create((set) => ({
  itemsCount: 0,
  totalPrice: 0,
  addItem: (price) => set((state) => ({ 
    itemsCount: state.itemsCount + 1,
    totalPrice: state.totalPrice + price,
  })),
  removeItem: (price) => set((state) => ({ 
    itemsCount: state.itemsCount - 1,
    totalPrice: state.totalPrice - price,
  })),
  reset: () => set((state) => {
    console.log(state.itemsCount)
    console.log(state.totalPrice)
    return {
    itemsCount: 0,
    totalPrice: 0,
  }}),
  setItemsCount: (itemsCount) => set((state) => ({ 
    itemsCount: itemsCount,
  })),
  setTotalPrice: (totalPrice) => set((state) => ({ 
    totalPrice: totalPrice,
  })),
}))