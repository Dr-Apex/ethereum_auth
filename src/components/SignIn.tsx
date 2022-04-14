import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";
import Header from "./home/Header";

declare let window: any;

const SignIn: FC = () => {
  const navigate = useNavigate();

  let domain, origin, provider, signer;
  const loadValues = () => {
    domain = window.location.host;
    origin = window.location.origin;
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
  };

  useEffect(() => {
    if (window !== undefined) {
      loadValues();
    }
  }, []); // eslint-disable-line

  const connectWallet = () => {
    provider
      .send("eth_requestAccounts", [])
      .catch(() => console.log("user rejected request"));
  };

  const createSiweMessage = (address, statement) => {
    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: "1",
    });
    return message.prepareMessage();
  };

  const signInWithEthereum = async () => {
    const message = createSiweMessage(
      await signer.getAddress(),
      "Sign in with Ethereum to the app."
    );
    await signer.signMessage(message).then(() => navigate("/home"));
  };

  return (
    <main className="h-screen bg-gradient-to-br from-teal-600 to-blue-800">
      <Header />
      <section className="h-screen flex justify-center items-center">
        <section className="w-1/3 relative flex flex-col items-center p-8 bg-white opacity-75 rounded shadow-xl">
          <h1 className="mb-4 text-3xl font-bold">SignIn with Ethereum</h1>
          <div className="flex justify-center">
            <button
              className="m-2 p-2 bg-blue-600 text-white rounded"
              onClick={connectWallet}
            >
              Connect wallet
            </button>
          </div>
          <div>
            <button
              className="m-2 p-2 bg-teal-500 text-white rounded"
              onClick={signInWithEthereum}
            >
              Sign-in with Ethereum
            </button>
          </div>
        </section>
      </section>
    </main>
  );
};

export default SignIn;
