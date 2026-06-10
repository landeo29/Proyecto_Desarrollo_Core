namespace Ventas.Application.Interfaces;

public interface IEventPublisher
{
    Task PublishAsync<T>(T evento) where T : class;
}