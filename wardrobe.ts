/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import type { WardrobeItem } from './types';

// FIX: Export default wardrobe data to resolve module import error.
export const defaultWardrobe: WardrobeItem[] = [
  { id: 'item-1', name: 'Blue T-Shirt', url: 'https://placehold.co/200x200/a0d2eb/495057?text=T-Shirt' },
  { id: 'item-2', name: 'Black Jeans', url: 'https://placehold.co/200x200/495057/e9ecef?text=Jeans' },
  { id: 'item-3', name: 'White Sneakers', url: 'https://placehold.co/200x200/e9ecef/495057?text=Sneakers' },
  { id: 'item-4', name: 'Red Hoodie', url: 'https://placehold.co/200x200/f08080/e9ecef?text=Hoodie' },
  { id: 'item-5', name: 'Denim Jacket', url: 'https://placehold.co/200x200/a0c4ff/495057?text=Jacket' },
];
