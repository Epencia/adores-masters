import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/connexion';
import LogoutScreen from '../screens/deconnexion';
import WelcomeScreen from '../screens/bienvenue';
import Categorie from '../screens/data/liste-categorie';
import Partenaire from '../screens/data/liste-partenaire';
import BottomTabsMobile from '../navigation/BottomTabNavigator';
import PartenaireCategorie from '../screens/data/partenaire-par-categorie';
import Reseau from '../screens/data/liste-mobile-money';
import Retrait from '../screens/data/retrait-carte';
import Transfert from '../screens/data/transfert-carte';
import Transactions from '../screens/data/liste-transaction';
import DetailsTransaction from '../screens/data/details-transaction';
import Commandes from '../screens/data/liste-commande';
import DetailsCommande from '../screens/data/details-commande';
import Stages from '../screens/data/menu-stage';
import PrestationPartenaire from '../screens/data/prestation-par-partenaire';
import DetailsPrestation from '../screens/data/details-prestation';
import ChoixThemeStage from '../screens/data/choix-theme-stage';
import AttestationStage from '../screens/data/liste-attestation';
import ListeCycle from '../screens/data/liste-cycle';
import FiliereParCycle from '../screens/data/liste-filiere';
import InscriptionStage from '../screens/data/inscription-stage';
import Prestations from '../screens/data/liste-prestation';
import ListeStagiaireTaches from '../screens/data/liste-stagiaire-taches';
import ListeTaches from '../screens/data/liste-taches';
import MenuStage from '../screens/data/menu-stage';
import CycleCritereNotation from '../screens/data/cycle-critere-notation';
import ListeCritereNotation from '../screens/data/liste-critere-notation';
import ReglementInterieur from '../screens/data/liste-reglement-interieur';
import ListeStagiaireThemeStage from '../screens/data/liste-stagiaire-theme';
import FoireAuxQuestions from '../screens/data/foire-question';
import MaitreStage from '../screens/data/liste-maitre-stage';
import Messages from '../screens/data/messages';
import ProfilScreen from '../screens/data/profil-utilisateur';
import TransfertStagiaire from '../screens/data/transfert-stagiaire';
import ListeNotification from '../screens/data/notification';
import Contacts from '../screens/data/contact';
import Partage from '../screens/data/partage';
import AccueilMobile from '../screens/data/accueil';
import ListeUtilisateur from '../screens/data/liste-utilisateur';
import ParametreMobile from '../screens/data/parametres';
import Exemple from '../screens/exemple';
import DetailsPublicite from '../screens/data/details-publicite';
import MenuCompte from '../screens/data/menu-compte';
import NouvellePublicite from '../screens/data/nouvelle-publicite';
import ListePublicite from '../screens/data/liste-publicite';
import Formations from '../screens/data/liste-formation';
import VideosFormation from '../screens/data/liste-video-formation';
import ComptesCertifies from '../screens/data/liste-compte-certifie';
import DetailsFormation from '../screens/data/details-formation';
import ListeSouscription from '../screens/data/liste-souscription';
import MenuServices from '../screens/data/menu-services';
import ScanQRCode from '../screens/data/scan-qrcode';
import MenuOffices from '../screens/data/menu-offices';
import ListeMessage from '../screens/data/liste-message';
import MenuDecouvrir from '../screens/data/menu-decouvrir';
import RechargementDirect from '../screens/data/validation-rechargement-direct';
import RechargementIndirect from '../screens/data/validation-rechargement-indirect';
import ListeThemeStage from '../screens/data/liste-theme-stage';
import ListeRapportStage from '../screens/data/liste-rapport-stage';
import DetailsTaches from '../screens/data/details-tache';
import ListeThemeChoisi from '../screens/data/liste-theme-choisi';
import ListeAmbassadeurs from '../screens/data/liste-ambassadeur';
import MenuRegistres from '../screens/data/menu-registres';
import MesMembres from '../screens/data/mes-membres';
import ChoixFormule from '../screens/data/choix-formule';
import FicheNotation from '../screens/data/fiche-notation';
import ListeStagiaireNotation from '../screens/data/liste-stagiaire-notation';
import ProcedurePartenaire from '../screens/data/procedure-partenaire';
import DetailsReglement from '../screens/data/details-reglement';
import Inscription from '../screens/inscription';
import SiteInternet from '../screens/data/site-internet';
import Epargnes from '../screens/data/liste-epargne';
import DetailsThemeStageMasters from '../screens/masters/details-theme-stage';
import ListeCycleMasters from '../screens/masters/liste-cycle';
import FiliereParCycleMasters from '../screens/masters/liste-filiere';
import DetailsTachesMasters from '../screens/masters/details-taches';
import MaitreStageMasters from '../screens/masters/liste-maitre-stage';
import ProfilScreenMasters from '../screens/masters/profil-utilisateur-masters';
import TransfertStagiaireMasters from '../screens/masters/transfert-stagiaire';
import DashboardMasters from '../screens/masters/accueil';
import StagiaireSansThemeMasters from '../screens/masters/liste-stagiaire-sans-theme';
import StagiaireSansMaitreMasters from '../screens/masters/liste-stagiaire-sans-maitre';
import StagiaireParMaitreMasters from '../screens/masters/liste-stagiaire-maitre-stage';
import DetailsStagiairesMasters from '../screens/masters/details-stagiaire';
import NombreStagiaireFiliereMasters from '../screens/masters/nombre-stagiaire-filiere';
import ListeStagiaireFiliereMasters from '../screens/masters/liste-stagiaire-filiere';
import ListeStagiaireCycleMasters from '../screens/masters/liste-stagiaire-cycle';
import NombreStagiaireCycleMasters from '../screens/masters/nombre-stagiaire-cycle';
import ListeStagiaireMasters from '../screens/masters/liste-stagiaire';
import ListeBeneficiaireMasters from '../screens/masters/liste-beneficiaire';
import DetailsBeneficiaireMasters from '../screens/masters/details-beneficiaire';
import DemandeStageActifMasters from '../screens/masters/liste-demande-stage-actif';
import DemandeStageInactifMasters from '../screens/masters/liste-demande-stage-inactif';
import ListeUtilisateurEpargne from '../screens/masters/liste-utilisateur-epargne';
import EpargnesMasters from '../screens/masters/liste-epargne';
import StagiairesBeneficiairesMasters from '../screens/masters/stagiaires-beneficiaires';
import TransactionsMasters from '../screens/masters/liste-transaction';
import CommandesMasters from '../screens/masters/liste-commande';
import CertificatsMasters from '../screens/masters/liste-certificat';
import ListeTachesFiliere from '../screens/masters/liste-taches-filiere';
import ListeThemesFiliere from '../screens/masters/liste-themes-filiere';
import MenuStageMasters from '../screens/masters/menu-stage';
import MenuServicesMasters from '../screens/masters/menu-services';
import DemandeStageEncoursMasters from '../screens/masters/liste-demande-stage-encours';
import DemandeStageAttenteMasters from '../screens/masters/liste-demande-stage-attente';
import ListeStagiaire from '../screens/data/liste-stagiaire';
import FormationsMasters from '../screens/masters/liste-formation';
import MenuStatistiquesMasters from '../screens/masters/menu-statistiques';
import FormulesMasters from '../screens/masters/liste-formule';
import SoutenanceActifMasters from '../screens/masters/liste-soutenance-actif';
import SoutenanceInactifMasters from '../screens/masters/liste-soutenance-attente';
import SoutenanceEncoursMasters from '../screens/masters/liste-soutenance-encours';
import CertificatsFormationsMasters from '../screens/masters/liste-certificat-formation';
import ResumeSoldeMasters from '../screens/masters/resume-solde';
import ResumeEpargneMasters from '../screens/masters/resume-epargne';
import ListeCycleStatistique from '../screens/masters/liste-cycle-stagiaire';
import ListeFiliereStatistique from '../screens/masters/liste-filiere-stagiaire';
import ResumePaiementMasters from '../screens/masters/resume-paiement';
import ResumeCreanceMasters from '../screens/masters/resume-creance';
import DetailsResumeMasters from '../screens/masters/details-resume';
import ResumeCaisseMasters from '../screens/masters/resume-caisse';
import MenuComptabiliteMasters from '../screens/masters/menu-comptabilite';
import ResumeEncadrantMasters from '../screens/masters/resume-encadrant';
import MesCertificatsMasters from '../screens/masters/liste-souscription';
import ListeCommandeResume from '../screens/masters/liste-commande-resume';
import ListeTransactionResume from '../screens/masters/liste-transaction-resume';
import FormationsCategorie from '../screens/data/liste-formation-categorie';
import ResumeRelanceMasters from '../screens/masters/resume-relance';
import ListePasswordMasters from '../screens/masters/liste-password';
import ResumeDepenseMasters from '../screens/masters/resume-depense';
import Recherche from '../screens/data/recherche';
import NouvelleEntreprise from '../screens/data/nouvelle-entreprise';
import OffreEmploi from '../screens/data/offre-emploi';
import ListePlateforme from '../screens/data/liste-plateforme';
import DetailsPlateforme from '../screens/data/details-plateforme';
import MenuEtudes from '../screens/data/menu-etudes';
import FicheProfessionnelle from '../screens/data/fiche-professionnelle';
import Tutoriels from '../screens/data/tutoriel';
import EcoleCabinet from '../screens/data/ecole-cabinet';
import FiliereBTS from '../screens/data/filiere-bts';
import MatiereParFiliere from '../screens/data/liste-matiere-filiere';
import MenuGeneral from '../screens/data/menu-general';
import EpreuveParMatiere from '../screens/data/liste-epreuve-matiere';
import PDF from '../screens/data/pdf';
import ListeDocument from '../screens/data/liste-document';
import PDFURL from '../screens/data/pdf-url';
import ListeClasse from '../screens/data/liste-classe';
import MatiereParClasse from '../screens/data/liste-matiere-classe';
import CoursParMatiere from '../screens/data/liste-cours-matiere';
import PriseEnCharge from '../screens/data/liste-prise-charge';
import MesPrisesEnCharge from '../screens/data/mes-prises-charge';
import ListeNiveau from '../screens/data/liste-niveau';
import ListeRepetiteur from '../screens/data/liste-repetiteur';
import NouveauCompteRepetiteur from '../screens/data/compte-repetiteur';
import MesRepetiteurs from '../screens/data/mes-repetiteurs';
import ConditionStage from '../screens/data/condition-stage';
import RegistreFormations from '../screens/data/registre-formation';
import RegistreStagiaires from '../screens/data/registre-stagiaire';
import PresentationGenerale from '../screens/data/presentation-generale';



const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>

      <Stack.Navigator initialRouteName="Bienvenue">
        

      <Stack.Screen 
        name="Exemple" 
        component={Exemple} 
        options={{headerShown: true}}
        />


      <Stack.Screen 
        name="Bienvenue" 
        component={WelcomeScreen} 
        options={{headerShown: true}}
        />

       <Stack.Screen 
        name="Connexion" 
        component={LoginScreen} 
        options={{title: 'Connexion ',headerShown: true}}
        />


<Stack.Screen 
        name="Deconnexion" 
        component={LogoutScreen} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu Mobile" 
        component={BottomTabsMobile} 
        options={{headerShown: false}}
        />
        

<Stack.Screen 
        name="Inscription" 
        component={Inscription} 
        options={{headerShown: true}}
        />
        


        <Stack.Screen 
        name="Accueil Mobile" 
        component={AccueilMobile} 
        options={{headerShown: true}}
        />





<Stack.Screen 
        name="Menu Decouvrir" 
        component={MenuDecouvrir} 
        options={{headerShown: true}}
        />  

<Stack.Screen 
        name="Details publicite" 
        component={DetailsPublicite} 
        options={{headerShown: true}}
        /> 

<Stack.Screen 
        name="Liste des utilisateurs" 
        component={ListeUtilisateur} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Menu registres" 
        component={MenuRegistres} 
        options={{headerShown: true}}
        />


        <Stack.Screen 
        name="Parametres Mobiles" 
        component={ParametreMobile} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu compte" 
        component={MenuCompte} 
        options={{headerShown: true}}
        />




      <Stack.Screen 
        name="Catalogue" 
        component={Categorie} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Profil" 
        component={ProfilScreen} 
        options={{headerShown: true}}
        />
        

<Stack.Screen 
        name="Partenaires" 
        component={Partenaire} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Partenaire par categorie" 
        component={PartenaireCategorie} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Moyens de rechargement" 
        component={Reseau} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Rechargement direct" 
        component={RechargementDirect} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Rechargement indirect" 
        component={RechargementIndirect} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Retrait" 
        component={Retrait} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Transfert" 
        component={Transfert} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Epargnes" 
        component={Epargnes} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Transactions" 
        component={Transactions} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Details transaction" 
        component={DetailsTransaction} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Commandes" 
        component={Commandes} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Details commande" 
        component={DetailsCommande} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Stage" 
        component={Stages} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Condition de stage" 
        component={ConditionStage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Inscription de stage" 
        component={InscriptionStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des cycles" 
        component={ListeCycle} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Critères de notation" 
        component={CycleCritereNotation} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Fiches de notation" 
        component={FicheNotation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des stagiaires" 
        component={ListeStagiaire} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste stagiaire notation" 
        component={ListeStagiaireNotation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des criteres de notation" 
        component={ListeCritereNotation} 
        options={{headerShown: true}}
        />





<Stack.Screen 
        name="Règlement interieur" 
        component={ReglementInterieur} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Filieres par cycle" 
        component={FiliereParCycle} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des stagiaires theme" 
        component={ListeStagiaireThemeStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Choix du theme" 
        component={ChoixThemeStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Themes choisis" 
        component={ListeThemeChoisi} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Attestation de stage" 
        component={AttestationStage} 
        options={{headerShown: true}}
        />



        

        <Stack.Screen 
        name="Procedure & Partenaire" 
        component={ProcedurePartenaire} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Telechargement" 
        component={ListeDocument} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Prestations par partenaire" 
        component={PrestationPartenaire} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Prestations" 
        component={Prestations} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details prestation" 
        component={DetailsPrestation} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Details reglement" 
        component={DetailsReglement} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Menu stage" 
        component={MenuStage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu etudes" 
        component={MenuEtudes} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu services" 
        component={MenuServices} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Menu Offices" 
        component={MenuOffices} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Scanner QRCode" 
        component={ScanQRCode} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des stagiaires taches" 
        component={ListeStagiaireTaches} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des taches" 
        component={ListeTaches} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Details des taches" 
        component={DetailsTaches} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des themes" 
        component={ListeThemeStage} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des rapports" 
        component={ListeRapportStage} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Foires aux questions" 
        component={FoireAuxQuestions} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Maitre de stage" 
        component={MaitreStage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Messages" 
        component={Messages} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des messages" 
        component={ListeMessage} 
        options={{headerShown: true}}
        />








<Stack.Screen 
        name="Mes membres" 
        component={MesMembres} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Transfert de stagiaires" 
        component={TransfertStagiaire} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Notifications" 
        component={ListeNotification} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Contacts" 
        component={Contacts} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Videos par formation" 
        component={VideosFormation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Formations" 
        component={Formations} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Categorie Formations" 
        component={FormationsCategorie} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details formation" 
        component={DetailsFormation} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des souscriptions" 
        component={ListeSouscription} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Partage" 
        component={Partage} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des ambassadeurs" 
        component={ListeAmbassadeurs} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Choix formule" 
        component={ChoixFormule} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Nouvelle publicite" 
        component={NouvellePublicite} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Nouvelle entreprise" 
        component={NouvelleEntreprise} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste publicite" 
        component={ListePublicite} 
        options={{headerShown: true}}
        />
        


<Stack.Screen 
        name="Comptes certifies" 
        component={ComptesCertifies} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Fiche Professionnelle" 
        component={FicheProfessionnelle} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Tutoriels" 
        component={Tutoriels} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Ecoles & cabinets" 
        component={EcoleCabinet} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Filieres BTS" 
        component={FiliereBTS} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Matiere par filiere" 
        component={MatiereParFiliere} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Epreuve par matiere" 
        component={EpreuveParMatiere} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste classe" 
        component={ListeClasse} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Matiere par classe" 
        component={MatiereParClasse} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Cours par matiere" 
        component={CoursParMatiere} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="PDF" 
        component={PDF} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="PDF URL" 
        component={PDFURL} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Prise en charge" 
        component={PriseEnCharge} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Mes prises en charge" 
        component={MesPrisesEnCharge} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste niveau" 
        component={ListeNiveau} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste repetiteur" 
        component={ListeRepetiteur} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Nouveau repetiteur" 
        component={NouveauCompteRepetiteur} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Mes repetiteurs" 
        component={MesRepetiteurs} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Registre des formations" 
        component={RegistreFormations} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Registre des stagiaires" 
        component={RegistreStagiaires} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Presentation generale" 
        component={PresentationGenerale} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu general" 
        component={MenuGeneral} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Dashboard Masters" 
        component={DashboardMasters} 
        options={{headerShown: false}}

        />

<Stack.Screen 
        name="Menu stage Masters" 
        component={MenuStageMasters} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Menu services Masters" 
        component={MenuServicesMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu Statistiques Masters" 
        component={MenuStatistiquesMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Menu Comptabilite Masters" 
        component={MenuComptabiliteMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Profil Masters" 
        component={ProfilScreenMasters} 
        options={{headerShown: true}}
        />
        

<Stack.Screen 
        name="Liste des cycles Masters" 
        component={ListeCycleMasters} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Filieres par cycle Masters" 
        component={FiliereParCycleMasters} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Details du theme Masters" 
        component={DetailsThemeStageMasters} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Stagiaires sans theme Masters" 
        component={StagiaireSansThemeMasters} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Stagiaires sans maitre Masters" 
        component={StagiaireSansMaitreMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Stagiaires par maitre Masters" 
        component={StagiaireParMaitreMasters} 
        options={{headerShown: true}}
        />
        

        <Stack.Screen 
        name="Demandes de stage en attente Masters" 
        component={DemandeStageAttenteMasters} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Demandes de stage en cours Masters" 
        component={DemandeStageEncoursMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Demandes de stage actif Masters" 
        component={DemandeStageActifMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Demandes de stage inactif Masters" 
        component={DemandeStageInactifMasters} 
        options={{headerShown: true}}
        />





<Stack.Screen 
        name="Liste des taches filiere" 
        component={ListeTachesFiliere} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste des themes filiere" 
        component={ListeThemesFiliere} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details tache Masters" 
        component={DetailsTachesMasters} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Maitre de stage Masters" 
        component={MaitreStageMasters} 
        options={{headerShown: true}}
        />





<Stack.Screen 
        name="Transfert de stagiaires Masters" 
        component={TransfertStagiaireMasters} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Liste des beneficiaires Masters" 
        component={ListeBeneficiaireMasters} 
        options={{headerShown: true}}
        />
        

        <Stack.Screen 
        name="Details beneficiaire Masters" 
        component={DetailsBeneficiaireMasters} 
        options={{headerShown: true}}
        />
        

        <Stack.Screen 
        name="Liste des stagiaires Masters" 
        component={ListeStagiaireMasters} 
        options={{headerShown: true}}
        />




<Stack.Screen 
        name="Stagiaires Beneficiaires" 
        component={StagiairesBeneficiairesMasters} 
        options={{headerShown: true}}
        /> 

<Stack.Screen 
        name="Certificats Masters" 
        component={CertificatsMasters} 
        options={{headerShown: true}}
        /> 


<Stack.Screen 
        name="Certificats Formations Masters" 
        component={CertificatsFormationsMasters} 
        options={{headerShown: true}}
        /> 


<Stack.Screen 
        name="Mes Certificats Masters" 
        component={MesCertificatsMasters} 
        options={{headerShown: true}}
        /> 

        

        <Stack.Screen 
        name="Nombre stagiaires par filiere Masters" 
        component={NombreStagiaireFiliereMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Nombre stagiaires par cycle Masters" 
        component={NombreStagiaireCycleMasters} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Liste stagiaires par filiere Masters" 
        component={ListeStagiaireFiliereMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste stagiaires par cycle Masters" 
        component={ListeStagiaireCycleMasters} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Details stagiaires Masters" 
        component={DetailsStagiairesMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste utilisateurs epargne" 
        component={ListeUtilisateurEpargne} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Liste epargnes utilisateur" 
        component={EpargnesMasters} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Transactions Masters" 
        component={TransactionsMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Commandes Masters" 
        component={CommandesMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Formations Masters" 
        component={FormationsMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Formules Masters" 
        component={FormulesMasters} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Soutenance Actif Masters" 
        component={SoutenanceActifMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Soutenance Inactif Masters" 
        component={SoutenanceInactifMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Soutenance Encours Masters" 
        component={SoutenanceEncoursMasters} 
        options={{headerShown: true}}
        />





<Stack.Screen 
        name="Liste Cycle Statistique" 
        component={ListeCycleStatistique} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste Filiere Statistique" 
        component={ListeFiliereStatistique} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Resume Solde Masters" 
        component={ResumeSoldeMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Resume Epargne Masters" 
        component={ResumeEpargneMasters} 
        options={{headerShown: true}}
        />

<Stack.Screen 
        name="Resume Paiement Masters" 
        component={ResumePaiementMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Resume Creance Masters" 
        component={ResumeCreanceMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Resume Encadrant Masters" 
        component={ResumeEncadrantMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Resume Relance Masters" 
        component={ResumeRelanceMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Resume Depense Masters" 
        component={ResumeDepenseMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Resume Caisse Masters" 
        component={ResumeCaisseMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details Resume Masters" 
        component={DetailsResumeMasters} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste Commande Statistique" 
        component={ListeCommandeResume} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste Transaction Statistique" 
        component={ListeTransactionResume} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Liste Password Statistique" 
        component={ListePasswordMasters} 
        options={{headerShown: true}}
        />






<Stack.Screen 
        name="Site internet" 
        component={SiteInternet} 
        options={{headerShown: false}}
        />



<Stack.Screen 
        name="Recherche" 
        component={Recherche} 
        options={{headerShown: true}}
        />



<Stack.Screen 
        name="Offre Emploi" 
        component={OffreEmploi} 
        options={{headerShown: false}}
        />



<Stack.Screen 
        name="Liste Plateforme" 
        component={ListePlateforme} 
        options={{headerShown: true}}
        />


<Stack.Screen 
        name="Details Plateforme" 
        component={DetailsPlateforme} 
        options={{headerShown: true}}
        />


      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes