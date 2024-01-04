<footer class="contact" id="contact">
        <div class="social-networks">
            <p>Siguenos en nuestras redes sociales</p>
            <div class="icons-networks">
                <div class="icon-network"> 
                    <a href="https://www.facebook.com/ritmo.antilano.sonido?mibextid=kFxxJD">
                        <i class="fa-brands fa-facebook"></i>
                    </a>
                </div>
                <div class="icon-network">
                    <a href="https://twitter.com/i/flow/login">                
                        <i class="fa-solid fa-x"></i>
                    </a>
                </div>
                <div class="icon-network">
                    <a href="https://www.instagram.com/">
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                </div>
                <div class="icon-network">
                    <a href="https://www.youtube.com/channel/UCD0uCamIwFTHssuaaJROeow">
                        <i class="fa-brands fa-youtube"></i>
                    </a>
                </div>
            </div>
        </div>
        <div class="numbers-phone">
            <p> Contrataciones</p>
            <div class="numbers">
                <div class="number-phone">
                    <i class="fa-solid fa-phone"></i>
                    <a href="#">5534801983</a>
                </div>
                <div class="number-phone">
                    <i class="fa-solid fa-phone"></i>
                    <a href="#">5534581937</a>
                </div>
            </div>
        </div>
    </footer> 
    <script src="https://unpkg.com/scrollreveal"></script>
    <script src="main.js"></script>
    <script  type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script>
    <script  type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/locale/es.js"></script>
    <script type="text/javascript">
        let calendar = new Calendar('calendar');
        calendar.getElement().addEventListener('change', e => {
            console.log(calendar.value().format('LLL'));
        });
    </script>
</body>
</html>