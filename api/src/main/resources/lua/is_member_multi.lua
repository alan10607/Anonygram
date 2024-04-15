local first_key = KEYS[1];
local second_key = KEYS[2];
local value = ARGV[1];

-- Check keys exist
-- 1: Any of the keys exist, 0: None of the keys exist
if(redis.call('sismember', first_key, value) == 1 or redis.call('sismember', second_key, value) == 1) then
    return 1;
else
    return 0;
end