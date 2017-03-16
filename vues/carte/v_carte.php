<!doctype html>
<html class="no-js" lang="fr" manifest="montaner.appcache">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <link href='idmenu.png' rel='apple-touch-icon' type='image/png'>
        <title>Nos produits</title>
        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.css"/>
        <link rel="stylesheet" href="css/style.css"/>
        <link href='https://fonts.googleapis.com/css?family=Gentium+Book+Basic' rel='stylesheet' type='text/css'>
    </head>

    <body>            

        <!-- Page accueil -->
        <div data-role="page" id="home" tabindex="0" class="ui-page" data-next="#listevins" data-transition="slide" data-url="home">

            <div role="main" id="contentHome" class="ui-content">
                <div>
                    <div id="vins" class="offres">
                        VINS
                    </div>
                    <div id="offres" class="offres">
                        OFFRES<br />SPECIALES
                    </div>
                </div>
            </div>
        </div>


        <!-- Page liste des vins -->    
        <div date-role="page" id="listevins" data-url='listevins' class="ui-page" data-prev="#home" data-transition="slide">

            <div>
                <a href="#home" data-transition="slide" data-direction="reverse"><img src="images/home.png" class="homeButton"></a>
                <div id="barreRecherche" class="search-bar">
                    <input type="search" name="password" id="search" value="" placeholder="Rechercher...">
                </div>
                <h1 id="bandeauTitre">La cave</h1>
            </div>

            <div role="main">
                <form class="ui-grid-b">

                    <!-- Choix de la région -->
                    <div class="ui-block-a" >
                        <a href="#popup-checkbox-region" data-rel="popup" data-transition="pop">
                            <img class="imgCheckbox" src="images/vignoble.jpg" alt="région"/>
                        </a>
                        <div data-role="popup" id="popup-checkbox-region" class="paddingCheckbox">
                            <!-- Bouton fermer popup -->
                            <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right"></a>
                            <!-- Popup checkbox régions -->
                        </div>
                    </div>

                    <!-- Choix de la couleur -->
                    <div class="ui-block-b" >
                        <a href="#popup-checkbox-couleur" data-rel="popup" data-transition="pop">
                            <img class="imgCheckbox" src="images/verres-vins.jpg" alt="verres de vins"/>
                        </a>
                        <div data-role="popup" id="popup-checkbox-couleur" class="paddingCheckbox">
                            <!-- Bouton fermer popup -->
                            <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right"></a>
                            <!-- Popup checkbox couleurs -->
                        </div>
                    </div>

                    <!-- Choix du domaine -->
                    <div class="ui-block-c" >
                        <a href="#popup-checkbox-domaine" data-rel="popup" data-transition="pop">
                            <img class="imgCheckbox" src="images/cepage.jpg" alt="domaines"/>
                        </a>
                        <div data-role="popup" id="popup-checkbox-domaine" class="paddingCheckbox">
                            <!-- Bouton fermer -->
                            <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right"></a>
                            <!-- Popup checkbox domaines -->
                        </div>
                    </div>
                </form>

                <!-- Liste dynamique des vins -->
                <table data-role="table" class="ui-responsive ligneQuantite">
                    <thead>
                        <tr>
                            <th data-priority="persist" class="code">Codes</th>
                            <th data-priority="persist"></th>
                            <th data-priority="persist" class="tarif">75 cl</th>
                            <th data-priority="persist" class="doc"><img src="icones/doc.png" width="35" height="35"></th>
                        </tr>
                    </thead>
                </table>
                <div id="listeVins" class="liste">
                    <div data-role="popup" class="ui-content popupFicheVin popupFiche" data-overlay-theme="b">
                        <!-- Popup fiche vin -->
                        <div class="ficheVin" >
                            <p><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right"></a></p>
                            <p class="titreCheckbox"></p>
                            <p class="millesime"></p>
                            <div class="table-prix"></div>
                            <a href="#" class="lienDomaine ui-btn ui-corner-all ui-shadow ui-icon-arrow-r ui-btn-icon-left">
                                Présentation du domaine
                            </a>
                        </div>
                        <!-- Fiche domaine -->
                        <div class="ficheDomaine">
                            <p><a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right"></a></p>
                            <p class="titreCheckbox"></p>
                            <div class='photoDomaine'>
                                <img src="" alt=""/>
                            </div>
                            <div id="presentationDomaine" class="description"></div>
                            <p><a href="#" class="retourFicheVin ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-back ui-btn-icon-left">Retour</a></p>
                        </div>
                    </div>
                </div><!-- Fin liste dynamique des vins -->
            </div><!-- Fin main -->
        </div><!-- Fin page liste des vins -->

        <!-- Page liste offres spéciales -->    
        <div date-role="page" id="page_offres" data-url='page_offres' class="ui-page" data-prev="#home" data-transition="slide">

            <div>
                <a href="#home" data-transition="slide" data-direction="reverse"><img src="images/home.png" class="homeButton"></a>
                <h1 id="bandeauTitre">Offres spéciales</h1>
            </div>

            <div role="main">
                <!-- Liste dynamique des offres -->
                <div id="listeOffres" class="liste">
                    <ul id="liste_offres" data-role="listview" data-autodividers="true" data-divider-theme="c"></ul>
                </div>
                <div data-role="popup" class="ui-content popupFicheOffre popupFiche" data-overlay-theme="b" data-position-to="window">
                    <!-- Popup fiche event -->
                    <div class="ficheOffre" >
                        <a href="#" data-rel="back" class="ui-btn ui-corner-all ui-shadow ui-btn-a ui-icon-delete ui-btn-icon-notext ui-btn-right"></a>
                        <p class="titreCheckbox"></p>
                        <img class="offre" src="" alt=""/>
                    </div>
                </div>
            </div><!-- Fin main -->
        </div><!-- Fin page liste des offres -->

    </body>


    <script type="text/javascript" src="js/jquery.js"></script>
    <script type="text/javascript" src="js/jquery.mobile-1.4.5.min.js"></script>
    <script type="text/javascript" src="js/jquery.preload.min.js"></script>
    <script type="text/javascript" src="js/jquery.tablesorter.min.js"></script>
    <script type="text/javascript" src="js/fonctions.carte.js"></script>



</html>