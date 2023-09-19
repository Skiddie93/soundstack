import { useEffect, useState, Dispatch, SetStateAction } from "react";
import queryData from "@/utils/querySearch";


interface ListResultsPorps {
  searchData: Record<any, any>;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
}

interface ListItemProps {
  albumData: any;
  setAlbum: Dispatch<SetStateAction<Record<any, any> | undefined>>;
}

const ListResults = ({ searchData, setAlbum }: ListResultsPorps) => {
  const [items, setItems] = useState(searchData.albums.items);
  const [urlNext, setUrlNext] = useState(searchData.albums.next);
  const [loading, setLodaing] = useState(false);

 

  useEffect(() => {
    setItems(searchData.albums.items);
    setUrlNext(searchData.albums.next);
  }, [searchData]);

  const fetchNextBatch = async () => {
    setLodaing(true);
    const newBatch = await queryData(urlNext);

    if (!newBatch) return;
    const newItems = newBatch.albums.items;
    const newNextUrl = newBatch.albums.next;
    setItems((prev: []) => [...prev, ...newItems]);

    if (newItems.length > 0) {
      setUrlNext((prev: string) => newNextUrl);
    } else {
      setUrlNext(false);
    }
    setLodaing(false);
  };

  const ResultItem = ({ albumData, setAlbum }: ListItemProps) => {
    const albumName = albumData.name;
    const albumCoverSmall = albumData.images[1].url;
    const albumYear = albumData.release_date.split("-")[0];
    const artist = albumData.artists
      .map((artist: Record<any, any>) => artist.name)
      .join(" & ");

    const href = albumData.href;

    const getAlbum = async () => {
      const album = await queryData(href);
      const player = document.querySelector("#player");

      if (player) {
        player.scrollIntoView({ behavior: "smooth" });
      }

      setAlbum(album);
    };

    return (
      <div onClick={getAlbum} className="album-wrapper">
        <div className="album-info-modal">
          <p className="name"> {albumName}</p>
          <p className="artist">{artist}</p>
          <p className="year"> {albumYear}</p>
        </div>
        <div className="album">
          <img src={albumCoverSmall} alt={albumName} />
        </div>
      </div>
    );
  };

  return (
    <div>
      {items.length ? (
        <div className="search-results">
          {items.map((item: Record<any, any>) => {
            return (
              <ResultItem key={item.id} setAlbum={setAlbum} albumData={item} />
            );
          })}
          <div className="load-more">
            {!loading && urlNext && (
              <div onClick={fetchNextBatch} className="button">
                Load more
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="no-results">
          <p> No albums found</p>
        </div>
      )}
    </div>
  );
};

export default ListResults;
