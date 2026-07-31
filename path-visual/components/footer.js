const root = document.getElementById("footer");
const year = new Date().getFullYear();

root.innerHTML = `
<footer class="footer">
    
    <div class="links-group">
        <a href="" class="a" rel="noopener noreferrer">reportar</a>
        <button onclick="toggleTheme()" class="theme-toggle">
            <span class="icon-dark-link material-symbols-outlined icon-fill icons-links-group">dark_mode</span>
            <span class="icon-light-link material-symbols-outlined icon-fill icons-links-group">light_mode</span>
        </button>
        <a href="pth/cookies.html" class="a" rel="noopener noreferrer">cookie</a>
    </div>
    
    <br>
    
    <div class="links-group">       
        <p>Path &copy; ${year}</p>                
        <p>v1.2.1</p>
    </div>
    
    <div class="links-group">
        <a href="" class="a">original Marlon Siqueira</a>
    </div>
    
</footer>
`;