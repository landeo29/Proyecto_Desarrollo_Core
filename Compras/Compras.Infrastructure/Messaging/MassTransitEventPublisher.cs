using Compras.Application.Interfaces;
using MassTransit;

namespace Compras.Infrastructure.Messaging;

public class MassTransitEventPublisher : IEventPublisher
{
    private readonly IPublishEndpoint _publishEndpoint;

    public MassTransitEventPublisher(IPublishEndpoint publishEndpoint)
        => _publishEndpoint = publishEndpoint;

    public Task PublishAsync<T>(T evento) where T : class
        => _publishEndpoint.Publish(evento);
}