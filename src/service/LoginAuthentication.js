export const LoginAuthentication = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await fetch(
        "https://prescription-api-gateway.onrender.com/prescription-service/pharmacy/checkPharmacy",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to checkLoggedIn");
      }

      const data = await response.json();
      return data.pharmacy;
    } catch (error) {
      throw new Error("Failed to checkLoggedIn");
    }
  } else {
    return null;
  }
};
