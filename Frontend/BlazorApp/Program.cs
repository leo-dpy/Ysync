using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.AspNetCore.Components.Authorization;
using Blazored.LocalStorage;
using BlazorApp;
using BlazorApp.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddBlazoredLocalStorage();

// API base URL : en prod, Nginx route /api/ vers NestJS
// En dev, on utilise le backend local sur le port 3000
var apiBase = builder.HostEnvironment.BaseAddress;
if (builder.HostEnvironment.IsDevelopment())
{
    apiBase = "http://localhost:3000/";
}
else
{
    apiBase = builder.HostEnvironment.BaseAddress + "api/";
}

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(apiBase) });

builder.Services.AddScoped<ApiService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<SallesService>();
builder.Services.AddScoped<MaterielsService>();
builder.Services.AddScoped<ReservationsService>();

builder.Services.AddAuthorizationCore();
builder.Services.AddScoped<CustomAuthStateProvider>();
builder.Services.AddScoped<AuthenticationStateProvider>(sp => sp.GetRequiredService<CustomAuthStateProvider>());

await builder.Build().RunAsync();
