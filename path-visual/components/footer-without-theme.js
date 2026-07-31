const root = document.getElementById("footer");
const year = new Date().getFullYear();

root.innerHTML = `
<footer class="footer">
    
    <div class="links-group">
        <a href="" class="a" rel="noopener noreferrer">reportar</a>       
        <a href="" class="a" target="_blank" rel="noopener noreferrer">cookie</a>
    </div>
    
    <br>
    
    <div class="links-group">       
        <p>Path &copy; ${year}</p>                
        <p>v1.2.1</p>
    </div>
    
    <div class="links-group">
        <a href="" class="a" target="_blank">original Marlon Siqueira</a>
    </div>
    
</footer>
`;