package com.ag.domain.service.base;

public interface CrudService<Entity> {
    Entity get(Entity entity);
    Entity create(Entity entity);
    Entity update(Entity entity);
    Entity patch(Entity entity);
    Entity delete(Entity entity);
}
