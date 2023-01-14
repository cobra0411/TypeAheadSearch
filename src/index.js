import "./styles.css";
import { debounce } from "./debounce";
const getResults = (keyword) => {
  const dbList = [
    "hello",
    "wake",
    "up",
    "nothing",
    "everything",
    "search",
    "autocomplete",
    "autocompleted"
  ];
  let results = dbList.filter((item) =>
    item.toLowerCase().startsWith(keyword.toLowerCase())
  );
  return new Promise((res, rej) => {
    res(results);
  });
};

const renderResults = (results, domElement) => {
  let domFragment = document.createDocumentFragment();
  results.forEach((item) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("search-item");
    resultItem.innerHTML = item;
    domFragment.appendChild(resultItem);
  });
  domElement.appendChild(domFragment);
};
const clearResults = (domElement) => {
  domElement.innerHTML = "";
};

const onInputChange = async (event) => {
  console.log(event.target.value);
  const value = event.target.value;
  const results = await getResults(value);
  const domElement = document.getElementById("search-result-wrapper");
  clearResults(domElement);
  renderResults(results, domElement);
  console.log({ results });
};

const onSearchResultClicked = (event) => {
  console.log(event.target.innerHTML);
  const inputElement = document.getElementById("search-input");
  const resultsWrapper = document.getElementById("search-result-wrapper");
  inputElement.value = event.target.innerHTML;
  clearResults(resultsWrapper);
};

(() => {
  const inputElement = document.getElementById("search-input");
  const resultsWrapper = document.getElementById("search-result-wrapper");
  inputElement.addEventListener("input", debounce(onInputChange, 500));
  resultsWrapper.addEventListener("click", onSearchResultClicked);
})();
