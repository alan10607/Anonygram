local key = KEYS[1];
local value = ARGV[1]; -- 1: like, 0: dislike

-- Check if it is already the target status or not
-- 1: succeeded, 0: no change
if(redis.call('exists', key) == 1 and redis.call('get', key) == value) then
    return 0;
else
    redis.call('set', key, value);
    return 1;
end
