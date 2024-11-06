User = User or {}
Post = Post or {}
Link = Link or {}
Vist = Vist or {}
Click = Click or {}
local json = require("json")
local function User_create(user, post)
  if User[user] == nil then
    User[user] = {}
    table.insert(User[user], post)
    return
  end
  table.insert(User[user], post)
end

Handlers.add("tags", Handlers.utils.hasMatchingTag("Action", "tag"), function(msg)
  local data = "The Key is `carname` and the value is " .. msg.Tags.carname
  Handlers.utils.reply(data)(msg)
end)

Handlers.add("add_link", Handlers.utils.hasMatchingTag("Action", "add_link"), function(msg)
  if (msg.Data ~= nil) then
    for _, value in ipairs(json.decode(msg.Data)) do
      Link[value.uuid] = {}
      Link[value.uuid].name = value.name
    end
  end
  Handlers.utils.reply("Link Added")(msg)
end)

Handlers.add("add_post", Handlers.utils.hasMatchingTag("Action", "add_post"), function(msg)
  assert(type(msg.Tags.handler) == "string" and msg.Tags.handler ~= nil, "Post handler is required")
  Post[msg.Tags.handler] = {}
  if msg.Tags.name ~= nil then
    Post[msg.Tags.handler].name = msg.Tags.name
  end
  if msg.Data ~= nil then
    Post[msg.Tags.handler].social = {}
    for _, value in pairs(json.decode(msg.Data)) do
      table.insert(Post[msg.Tags.handler].social, value)
    end
  end
  User_create(msg.From, msg.Tags.handler)
  Handlers.utils.reply("Post Added")(msg)
end)

Handlers.add("get_link", Handlers.utils.hasMatchingTag("Action", "get_link"), function(msg)
  assert(type(msg.Tags.uuid) == "string" and msg.Tags.uuid ~= nil, "Link uuid is required")
  local link = Link[msg.Tags.uuid]
  if link == nil then
    Handlers.utils.reply(json.encode({ status = 0, data = "" }))(msg)
  else
    local data = json.encode(link)
    Handlers.utils.reply(json.encode({ status = 1, data = data }))(msg)
  end
end)

Handlers.add("get_post", Handlers.utils.hasMatchingTag("Action", "get_post"), function(msg)
  assert(type(msg.Tags.handler) == "string" and msg.Tags.handler ~= nil, "Post handler is required")
  local post = Post[msg.Tags.handler]
  if post == nil then
    Handlers.utils.reply(json.encode({ status = 0, data = "" }))(msg)
  else
    local data = json.encode(post)
    Handlers.utils.reply(json.encode({ status = 1, data = data }))(msg)
  end
end)

Handlers.add("get_user", Handlers.utils.hasMatchingTag("Action", "get_user"), function(msg)
  local user = User[msg.From]
  if user == nil then
    Handlers.utils.reply(json.encode({ status = 0, data = "" }))(msg)
  else
    local data = json.encode(user)
    Handlers.utils.reply(json.encode({ status = 1, data = data }))(msg)
  end
end)

Handlers.add("add_visit", Handlers.utils.hasMatchingTag("Action", "add_visit"), function(msg)
  assert(type(msg.Tags.url) == "string" and msg.Tags.url ~= nil, "url is required")
  if Vist[msg.Tags.url] == nil then
    Vist[msg.Tags.url] = 1
  else
    Vist[msg.Tags.url] = Vist[msg.Tags.url] + 1
  end
  Handlers.utils.reply("Visit Added")(msg)
end)

Handlers.add("get_visit", Handlers.utils.hasMatchingTag("Action", "get_visit"), function(msg)
  assert(type(msg.Tags.url) == "string" and msg.Tags.url ~= nil, "url is required")
  local vist = Vist[msg.Tags.url]
  if vist == nil then
    Handlers.utils.reply(json.encode({ visit = 0 }))(msg)
  else
    Handlers.utils.reply(json.encode({ visit = vist }))(msg)
  end
end)

Handlers.add("add_click", Handlers.utils.hasMatchingTag("Action", "add_click"), function(msg)
  assert(type(msg.Tags.time) == "string" and msg.Tags.time ~= nil, "time is required")
  assert(type(msg.Tags.uuid) == "string" and msg.Tags.uuid ~= nil, "uuid is required")
  if Click[msg.Tags.uuid] == nil then
    Click[msg.Tags.uuid] = {}
  end
  table.insert(Click[msg.Tags.uuid], { time = msg.Tags.time })
  Handlers.utils.reply("Click Added")(msg)
end)

Handlers.add("get_click", Handlers.utils.hasMatchingTag("Action", "get_click"), function(msg)
  assert(type(msg.Tags.uuid) == "string" and msg.Tags.uuid ~= nil, "uuid is required")
  local click = Click[msg.Tags.uuid]
  if click == nil then
    Handlers.utils.reply(json.encode({ click = 0 }))(msg)
  else
    Handlers.utils.reply(json.encode(click))(msg)
  end
end)

Handlers.add("remove_post", Handlers.utils.hasMatchingTag("Action", "remove_post"), function(msg)
  assert(type(msg.Tags.handler) == "string" and msg.Tags.handler ~= nil, "Post handler is required")
  for index, value in ipairs(User[msg.From]) do
    if value == msg.Tags.handler then
      table.remove(User[msg.From], index)
      Handlers.utils.reply("Post Removed")(msg)
      return
    end
  end
  Handlers.utils.reply("Unauthenticated")(msg)
end)
