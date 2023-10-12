import "@/app/tailwind.css";
import Routes from "@/app/routes";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistStore(store)}>
        <Routes />
      </PersistGate>
    </Provider>
  );
}
