const apikey = "ac20f0720732469f9cdc2de6bae66bd5";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return Array.isArray(data.articles) ? data.articles : [];
  } catch (error) {
    console.error("Error fetching random news", error);
    return [];
  }
}

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=10&apikey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return Array.isArray(data.articles) ? data.articles : [];
  } catch (error) {
    console.error("Error fetching news by query", error);
    return [];
  }
}

function displayBlogs(articles) {
  blogContainer.innerHTML = "";

  if (!articles.length) {
    blogContainer.innerHTML = "<p>No articles found.</p>";
    return;
  }

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");

    // Image
    const img = document.createElement("img");
    img.src = article.urlToImage || "https://via.placeholder.com/300x180?text=No+Image";
    img.alt = article.title || "No Title";

    // Title
    const title = document.createElement("h2");
    const titleText = article.title || "Untitled";
    const truncatedTitle = titleText.length > 30 ? titleText.slice(0, 30) + "..." : titleText;
    title.textContent = truncatedTitle;

    // Description
    const description = document.createElement("p");
    const descText = article.description || "No description available.";
    const truncatedDes = descText.length > 120 ? descText.slice(0, 120) + "..." : descText;
    description.textContent = truncatedDes;

    // Click to open article
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      if (article.url) {
        window.open(article.url, "_blank");
      }
    });

    blogContainer.appendChild(blogCard);
  });
}

// Handle search button
searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    const articles = await fetchNewsQuery(query);
    displayBlogs(articles);
  }
});

// Initial fetch on page load
(async () => {
  const articles = await fetchRandomNews();
  displayBlogs(articles);
})();
