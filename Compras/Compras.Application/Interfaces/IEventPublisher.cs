namespace Compras.Application.Interfaces;

public interface IEventPublisher
{
    Task PublishAsync<T>(T evento) where T : class;
}