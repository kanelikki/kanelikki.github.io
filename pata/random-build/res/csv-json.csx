using System.Text.Json;
using System.Text.Json.Serialization;

Dictionary<string, List<Item>> dic = new Dictionary<string, List<Item>>();

using(var file = File.OpenRead("weapon-type.csv"))
using(var reader = new StreamReader(file))
{
    reader.ReadLine();
    string line;
    while((line=reader.ReadLine())!=null)
    {
        var values = Split(line);
        var group = values[1];
        if(!dic.ContainsKey(group))
        {
            dic.Add(group,new List<Item>());
        }
        dic[group].Add(
            new Item(values[0],values[2],values[3])
        );
    }
}
Console.WriteLine(JsonSerializer.Serialize(dic));
string[] Split(string input) => input.Split('\t');

public class Item
{
    [JsonPropertyName("rarity")]
    public string Rarity{get;set;}
    [JsonPropertyName("name")]
    public string Name{get;set;}
    [JsonPropertyName("type")]
    public string Type{get;set;}
    public Item(string rarity, string name, string type)
    {
        Rarity = rarity;
        Name = name;
        Type = type;
    }
}