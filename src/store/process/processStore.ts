import { create } from 'zustand';

import type { IAction } from '@/pages/process/ProcessTypes';

import type { IPage } from './processStoreTypes';

interface IStates {
  pages: IPage[];
  currentPage: IPage;
}

type Actions = {
  setPages: (newPage: IPage) => void;
  setCurrentPage: (page: IPage) => void;
  removePage: (id: number) => void;
  updatePageActions: (newAction: IAction) => void;
  swapActions: (firstIdx: number, secondIdx: number) => void;
  removeAction: (id: number) => void;
  updateAction: (id: number, newAction: IAction) => void;
};

const defaultPage: IPage = {
  name: 'Шаг 1',
  actions: [],
  id: Date.now(),
  isPublished: false,
};

const initialStates: IStates = {
  pages: [defaultPage],
  currentPage: defaultPage,
};

export const useProcessStore = create<IStates & Actions>((set, get) => ({
  ...initialStates,
  setPages: (newPage) => set((state) => ({ pages: [...state.pages, newPage] })),
  setCurrentPage: (page) => set({ currentPage: page }),
  removePage: (id) => {
    const { pages } = get();
    const updatedPages = pages.filter((page) => page.id !== id);
    set({ pages: updatedPages, currentPage: updatedPages[0] });
  },
  updatePageActions: (action) => {
    const { currentPage, pages } = get();
    const updatedPage = {
      ...currentPage,
      actions: [...currentPage.actions, action],
    };
    const updatedPages = pages.map((page) => {
      if (page.id === currentPage.id) return updatedPage;
      return page;
    });

    set({
      currentPage: updatedPage,
      pages: updatedPages,
    });
  },
  swapActions: (firstId, secondId) => {
    const { currentPage, pages } = get();
    let firstIdx = null,
      secondIdx = null;
    const currentActions = [...currentPage.actions];

    for (let i = 0; i < currentActions.length; i++) {
      const action = currentActions[i];
      if (action.id === firstId || action.id === secondId) {
        if (firstIdx !== null) {
          secondIdx = i;
        } else {
          firstIdx = i;
        }
        if (firstIdx && secondIdx) break;
      }
    }

    if (firstIdx !== null && secondIdx !== null) {
      [currentActions[firstIdx], currentActions[secondIdx]] = [
        currentActions[secondIdx],
        currentActions[firstIdx],
      ];
      const updatedPages = pages.map((page) => {
        if (page.id === currentPage.id)
          return { ...page, actions: currentActions };
        return page;
      });
      set({
        currentPage: { ...currentPage, actions: currentActions },
        pages: updatedPages,
      });
    }
  },
  removeAction: (id) => {
    const { currentPage, pages } = get();
    const filteredActions = currentPage.actions.filter(
      (action) => action.id !== id
    );

    const updatedPage = { ...currentPage, actions: filteredActions };
    const updatedPages = pages.map((page) => {
      if (page.id === currentPage.id) return updatedPage;
      return page;
    });

    set({
      currentPage: updatedPage,
      pages: updatedPages,
    });
  },
  updateAction: (id, newAction) => {
    const { currentPage, pages } = get();
    const updatedActions = currentPage.actions.map((action) => {
      if (action.id === id) return newAction;
      return action;
    });

    const updatedPage = { ...currentPage, actions: updatedActions };
    const updatedPages = pages.map((page) => {
      if (page.id === currentPage.id) return updatedPage;
      return page;
    });

    set({
      currentPage: updatedPage,
      pages: updatedPages,
    });
  },
}));
