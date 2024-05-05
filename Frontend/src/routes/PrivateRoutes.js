import { Route } from "react-router-dom";
import MainPage from '../pages/Main/MainPage';
import { MainLayout } from "../pages/Main/layout/MainLayout.js";
import Library from '../pages/Private/Library'
import Profile from '../pages/Private/Profile'
import MintingDapp from '../pages/Private/OpenApp'
import WalletInfo from '../pages/Private/WalletInfo'
import Transactions from "../pages/Private/Transactions";
import OpenApp from "../pages/Private/OpenApp";

export const PrivateRoutes = () => {
  return [
    <Route key="mainpage"
      path="/mainpage"
      element={
        <MainPage />
      } />,
    
    <Route key="library"
      path="/mainpage/library"
      element={
        <MainLayout>
          <Library />
        </MainLayout>
      } />,

      <Route key="profile"
      path="/mainpage/profile"
      element={
        <MainLayout>
          <Profile/>
        </MainLayout>
      } />,

      <Route key="nft-minting"
      path="/mainpage/nft-minting"
      element={
        <MainLayout>
          <MintingDapp/>
        </MainLayout>
      } />,

      <Route key="wallet-info"
      path="/mainpage/wallet-info"
      element={
        <MainLayout>
          <WalletInfo/>
        </MainLayout>
      } />,

      <Route key="transactions"
      path="/mainpage/transactions"
      element={
        <MainLayout>
          <Transactions/>
        </MainLayout>
      } />,

      <Route key="open-app"
      path="/mainpage/open-app"
      element={
        <MainLayout>
          <OpenApp/>
        </MainLayout>
      } />,
    



  ];
}
