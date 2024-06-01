function openTab(event, tabId) {
  var i, tabContent, tabLinks;

  // Hide all tab contents
  tabContent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  // Remove the active class from all tab links
  tabLinks = document.getElementsByClassName("tab-link");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(" active", "");
  }

  // Show the current tab content and add an "active" class to the clicked tab link
  document.getElementById(tabId).style.display = "block";
  document.getElementById(tabId).style.background = "#f1f1f1";

  event.currentTarget.className += " active";
}
