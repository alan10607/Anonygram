package com.ag.domain.service.base;

import com.ag.domain.advice.ConcurrentSafety;
import com.ag.domain.exception.AgValidationException;
import com.ag.domain.util.PojoFiledUtil;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Slf4j
public abstract class CrudServiceImpl<Entity> implements CrudService<Entity> {

    protected abstract Entity getImpl(Entity entity);

    protected abstract Entity createImpl(Entity entity);

    protected abstract Entity updateImpl(Entity entity);

    protected abstract Entity deleteImpl(Entity entity);

    @Override
    public Entity get(Entity entity) {
        this.beforeGet(entity);
        return getImpl(entity);
    }

    @Override
    @ConcurrentSafety
    public Entity create(Entity entity) {
        this.beforeCreate(entity);
        return createImpl(entity);
    }

    @Override
    @ConcurrentSafety
    public Entity update(Entity entity) {
        this.validateIsExist(entity);
        this.beforeUpdateAndPatch(entity);
        return updateImpl(entity);
    }

    @Override
    @ConcurrentSafety
    public Entity patch(Entity entity) {
        Entity oldEntity = this.validateIsExist(entity);
        PojoFiledUtil.overwriteFields(oldEntity, entity);
        this.beforeUpdateAndPatch(oldEntity);
        return updateImpl(oldEntity);
    }

    @Override
    @ConcurrentSafety
    public Entity delete(Entity entity) {
        Entity oldEntity = this.validateIsExist(entity);
        this.beforeDelete(oldEntity);
        return deleteImpl(oldEntity);
    }

    private Entity validateIsExist(Entity entity) {
        Entity existing = this.get(entity);
        if (existing == null) {
            throw new AgValidationException("{} not found", entity.getClass().getSimpleName());
        }
        return existing;
    }

    private void validateIsNotExist(Entity entity) {
        if (this.get(entity) != null) {
            throw new AgValidationException("Entity already found in CRUD");
        }
    }

    protected void beforeGet(Entity entity) {
    }

    protected void beforeCreate(Entity entity) {
    }

    protected void beforeUpdateAndPatch(Entity entity) {
    }

    protected void beforeDelete(Entity entity) {
    }

}
