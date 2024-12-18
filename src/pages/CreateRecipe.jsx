import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { chatSession } from "../service/AiModel";
import Button from "../components/Button";

const AI_prompt = `Generate  a shopping list for Recipe: {Recipe} for {Serving} person. Include all necessary ingredients and quantities for [specific meals, e.g., breakfast, lunch, dinner, snacks] and any household essentials. Ensure the list is organized by Category	like Item Name , Quantity(gm/kg) ,  etc. in JSON format.`;

const CreateRecipe = () => {
  const [formData, setFormData] = useState([]);
  const [shoppingList, setShoppingList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {}, [formData]);

  // useEffect(() => {
  //   setData();
  // }, [OnGenerateRecipe]);

  const OnGenerateRecipe = async () => {
    if (formData?.Serving < 1 && !formData?.Recipe) {
      console.log("please fill all details");
      alert("please fill all details");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const FinalPrompt = AI_prompt.replace(
        "{Recipe}",
        formData?.Recipe
      ).replace("{Serving}", formData?.Serving);

      const result = await chatSession.sendMessage(FinalPrompt);
      const responseText = await result?.response?.text();
      const parsedData = JSON.parse(responseText);

      setShoppingList(parsedData);
    } catch (err) {
      setError("Failed to generate recipe. Please try again!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  console.log(shoppingList);

  return (
    <div className="h-auto w-screen px-10 sm:px-36 overflow-x-hidden">
      <h1 className="text-3xl font-bold text-center py-6">Create Recipe</h1>
      <div className="flex flex-col items-center text-xl font-bold ">
        <div className="grid grid-cols-2 mb-6">
          <h2>Recipe Name</h2>
          <input
            className=" text-[#6600ff] pl-6 py-2 rounded-lg border-none oultline-none focus:border-none focus:outline-none"
            placeholder="Write recipe name"
            type="text"
            onChange={(e) => handleInputChange("Recipe", e.target.value)}
          />
        </div>
        <div className=" grid grid-cols-2 mb-6">
          <h2>Serving</h2>
          <input
            className="text-[#6600ff] pl-6 py-2 rounded-lg border-none oultline-none focus:border-none focus:outline-none"
            placeholder="Number of person"
            type="number"
            onChange={(e) => handleInputChange("Serving", e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          onClick={OnGenerateRecipe}
          className="w-[80%] bg-[#fafafa] text-[#6600ff] font-bold uppercase hover:animate-pulse"
          disabled={loading}
        >
          {loading ? "Generating..." : "Create Recipe"}
        </Button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {shoppingList && (
        <div className="text-center my-12 border-2 border-[#fafafa] p-8">
          <h1 className="text-2xl font-semibold">
            Shopping List for {shoppingList.shopping_list.recipe}
          </h1>
          <p className="mb-6">
            Servings: {shoppingList.shopping_list.servings} | Meal Type:{" "}
            {shoppingList.shopping_list.meal_type}
          </p>

          <div className="grid grid-cols-2">
            <h3 className="text-xl font-bold">Item Name</h3>
            <h3 className="text-xl font-bold">Quantity</h3>
          </div>

          <div className="h-[1px] w-[90%] mx-auto bg-[#fafafa] my-3"></div>

          {shoppingList.shopping_list.categories.map(
            (category, categoryIndex) => (
              <div key={categoryIndex}>
                <table className="w-full border-collapse text-base text-center">
                  <h2 className="text-2xl font-bold underline underline-offset-4">
                    {category.category_name}
                  </h2>
                  <tbody>
                    {category.items.map((item, itemIndex) => (
                      <tr
                        key={itemIndex}
                        className="grid grid-cols-2 my-3 justify-items-center items-center"
                      >
                        <td className="text-base font-medium">
                          {item.item_name}
                        </td>
                        <td className="text-base">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default CreateRecipe;

{
  /* <table
style={{
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "16px",
}}
>
<thead>
  <tr>
    <th>Category</th>
    <th>Item Name</th>
    <th>Quality</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>
      {shoppingList.shopping_list.categories.map((index, item) => {
        return (
          <div key={index}>
            {item.category_name}
            <div>
              {item.items.map((index, item) => {
                return (
                  <div key={index}>
                    <div>{item.item_name}</div>
                    <div>{item.item_name}</div>
                    <div>{item.quantity}</div>
                    <div></div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </td>
    <td>hi</td>
    <td>hi</td>
  </tr>
</tbody>
</table> */
}
