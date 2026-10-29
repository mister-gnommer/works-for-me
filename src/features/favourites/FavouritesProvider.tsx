import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useEffect,
  useState,
} from "react";

import { parseIds, serializeIds, toggleId } from "./favouriteIds";

const STORAGE_KEY = "favouriteJobIds";

interface Favourites {
  isFavourite: (id: string) => boolean;
  toggle: (id: string) => void;
}

const FavouritesContext = createContext<Favourites | undefined>(undefined);

/** Holds favourite job ids for the whole app and keeps them in AsyncStorage. */
export function FavouritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<ReadonlySet<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .catch(() => null)
      .then((raw) => {
        // Merge, so a star tapped before storage finished loading is not lost.
        setIds((current) => new Set([...parseIds(raw), ...current]));
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    // Saving before the first load would overwrite stored favourites with an empty set.
    if (loaded) {
      AsyncStorage.setItem(STORAGE_KEY, serializeIds(ids)).catch(
        (error: unknown) => console.warn("Could not save favourites", error),
      );
    }
  }, [ids, loaded]);

  const isFavourite = useCallback((id: string) => ids.has(id), [ids]);
  const toggle = useCallback(
    (id: string) => setIds((current) => toggleId(current, id)),
    [],
  );

  return (
    <FavouritesContext value={{ isFavourite, toggle }}>
      {children}
    </FavouritesContext>
  );
}

/** Reads favourites; must be used below FavouritesProvider. */
export function useFavourites(): Favourites {
  const favourites = use(FavouritesContext);
  if (!favourites) {
    throw new Error("useFavourites must be used inside FavouritesProvider");
  }
  return favourites;
}
