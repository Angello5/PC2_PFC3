import "dotenv/config";
import { createApp } from "./app.js";
import { createSupabaseStore } from "./supabaseStore.js";

const port = Number(process.env.PORT || 4000);

createApp(createSupabaseStore() || undefined).listen(port, () => {
  console.log(`API Manos en Ruta escuchando en puerto ${port}`);
});
