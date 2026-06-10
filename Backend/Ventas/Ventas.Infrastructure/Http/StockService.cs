using System.Net.Http.Headers;
using System.Net.Http.Json;
using Microsoft.Extensions.Configuration;
using Ventas.Application.Interfaces;

namespace Ventas.Infrastructure.Http;

public class StockService : IStockService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _config;

    public StockService(HttpClient httpClient, IConfiguration config)
    {
        _httpClient = httpClient;
        _config = config;
    }

    public async Task<int> ObtenerStockAsync(int idProducto, string token)
    {
        var baseUrl = _config["Services:MovimientosUrl"];
        var request = new HttpRequestMessage(HttpMethod.Get, $"{baseUrl}/api/Movimiento/stock/{idProducto}");
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        var resultado = await response.Content.ReadFromJsonAsync<StockResponse>();
        return resultado?.StockActual ?? 0;
    }

    private class StockResponse
    {
        public int IdProducto { get; set; }
        public int StockActual { get; set; }
    }
}