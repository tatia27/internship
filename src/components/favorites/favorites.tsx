import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import icon from "../../assets/icons/like.svg";
import iconAdd from "../../assets/icons/addedLike.svg";
import { internshipService } from "../../services/internship";
import { UserContext } from "../../context/userContext";
import { FavoritesContext } from "../../context/favoritesContext";
import { internService } from "../../services/intern";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { IInternship } from "../filter/filter/filter";
import "./favorites.css";

type ItemProps = {
  item: IInternship;
};

function Favorites({ item }: ItemProps) {
  const { user } = useContext(UserContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const navigate = useNavigate();
  const id = item._id;

  useEffect(() => {
    async function loadFavorites() {
      if (user?.id) {
        const response = await internshipService.getFavoritesInternships(
          user.id
        );

        if (setFavorites) {
          setFavorites(response.data);
        }
      }
    }
    loadFavorites();
  }, [setFavorites, user?.id]);

  const addToFavorite = async (internshipId: string) => {
    try {
      if (user?.id) {
        const response = await internService.addToFavorites(
          internshipId,
          user?.id
        );

        if (response.data?.internship) {
          setFavorites((prev) => {
            return [...prev, response.data.internship];
          });
        }
      }
    } catch (error) {
      if ((error as AxiosError).response?.status === 400) {
        toast.error("Стажировка уже добавлена в избранное");
      } else if ((error as AxiosError).response?.status === 401) {
        toast.error("Авторизуйтесь в приложении");
      } else {
        toast.error("Упс, что-то пошло не так...");
      }
    }
  };

  const removeFromFavorites = async (internshipId: string) => {
    try {
      if (user?.id) {
        await internService.removeFromFavorites(internshipId, user?.id);

        setFavorites((prev) => {
          return prev.filter((it) => {
            return it._id !== internshipId;
          });
        });
      }
    } catch (error) {
      if ((error as AxiosError).response?.status === 400) {
        toast.error("Стажировка не найдена");
      } else {
        toast.error("Упс, что-то пошло не так...");
      }
    }
  };

  const favoriteIconOnClick = (event: { stopPropagation: () => void }) => {
    event.stopPropagation();

    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (favorites.find((it) => it._id === id)) {
      removeFromFavorites(id);
    } else {
      addToFavorite(id);
    }
  };

  const isFavoriteInternship = Boolean(
    user && favorites.find((it) => it._id === id)
  );

  return (
    <>
      {isFavoriteInternship ? (
        <img
          src={iconAdd}
          className="favorite"
          alt="Избранное"
          onClick={favoriteIconOnClick}
        />
      ) : (
        <img
          src={icon}
          className="favorite"
          alt="Избранное"
          onClick={favoriteIconOnClick}
        />
      )}
    </>
  );
}

export default Favorites;
