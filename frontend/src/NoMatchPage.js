import React from 'react'
import Nav from './components/Nav';
import axios from "./axiosInstance";
import LoginForm from './components/LoginForm';
import * as ROUTES from './constants/routes';

function NoMatchPage() {
  return (
    <main className="content">
      <h1 className="text-white text-uppercase text-center my-4">404 Not Found</h1>
    </main>
  );
}

export default NoMatchPage