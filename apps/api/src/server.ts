import "dotenv/config";
import { createApp } from "./app";
import { createSupabaseStore } from "./supabaseStore";

const port = Number(process.env.PORT || 4000);

createApp(createSupabaseStore() || undefined).listen(port, () => {
  console.log(`API Manos en Ruta escuchando en puerto ${port}`);
});
