import React from "react";
import { useQuery } from "@tanstack/react-query";
import { userApi } from "../../service/user/userApi";
import Loading from "../../Components/Loading";

const Favourite = () => {
  const { isLoading, isPending, data, error, refetch } = useQuery({
    queryKey: ["productfavoriteUserListApi"],
    queryFn: userApi.getProductfavoriteUser,
    staleTime: 5 * 60 * 1000,
    cacheTime: 12 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (isLoading) return <Loading />;
  else
    return (
      <div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {data.productsFavorite.map((dataFavorite, index) => (
              <tr key={index}>
                <td>{dataFavorite.id}</td>
                <td>
                  <img
                    src={dataFavorite.image}
                    alt={dataFavorite.name}
                    className="img-fluid w-50"
                  />
                </td>
                <td>{dataFavorite.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Favourite;
