//nah this is for just simple automation, I am lazy and won't refactor this.
using System.Text.Json;

readonly string[] fileNames = new string[] { "itemmsg.msg.txt", "systemmsg.msg.txt", "unitnamemsg.msg.txt" };
const string resultFileName = "result.json";
readonly string ComparerDir = Path.GetFullPath(@"..\data\uk");
readonly Dictionary<string, Dictionary<string, string>> compMap = new Dictionary<string, Dictionary<string, string>>();
foreach (var fileName in fileNames)
{
    Dictionary<string, string> map = new Dictionary<string, string>();
    var comparerPath = Path.Combine(ComparerDir, fileName);
    using (FileStream compStream = File.OpenRead(comparerPath))
    using (StreamReader compReader = new StreamReader(compStream))
    {
        string compLine;
        while ((compLine = compReader.ReadLine()) != null)
        {
            var splitted = compLine.Split(':', 2, StringSplitOptions.TrimEntries);
            map.Add(splitted[0], CutString(splitted[1]));
        }
    }
    compMap.Add(fileName.Substring(0, fileName.IndexOf('.')), map);
}

//WE KNOW THERE'S ONLY SPECIFIC DATA. DON'T USE THIS FOR PROD, THAT YOU CANNOT PREDICT INPUT!!
readonly var unsafeOptions = new JsonSerializerOptions();
unsafeOptions.Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping;

using (FileStream outputStream = File.Open(Path.Combine(ComparerDir, resultFileName), FileMode.Create))
using (StreamWriter outputWriter = new StreamWriter(outputStream)){
    outputWriter.WriteLine(JsonSerializer.Serialize(compMap, unsafeOptions));
}
readonly string dirsParent =  Path.GetFullPath(@"..\data");
foreach (var dir in Directory.GetDirectories(dirsParent))
{
    if(dir != ComparerDir) CreateJson(dir);
}

void CreateJson(string targetDir)
{
    var outputPath = Path.Combine(targetDir, resultFileName);
    Dictionary<string, Dictionary<string, string>> finalResultMap = new Dictionary<string, Dictionary<string, string>>();
    using (FileStream outputStream = File.Open(outputPath, FileMode.Create))
    using (StreamWriter outputWriter = new StreamWriter(outputStream))
    {
        foreach (var fileName in fileNames)
        {
            var fileNameSimple = fileName.Substring(0, fileName.IndexOf('.'));
            Console.WriteLine($"-------------- working on {fileName} -------------------");
            var targetPath = Path.Combine(targetDir, fileName);

            Dictionary<string, string> resultMap = new Dictionary<string, string>();

            using (FileStream targetStream = File.OpenRead(targetPath))
            using (StreamReader targetReader = new StreamReader(targetStream))
            {
                targetReader.ReadLine(); //skip first line.
                string targetLine;
                while ((targetLine = targetReader.ReadLine()) != null)
                {
                    var index = targetLine.IndexOf(':');
                    if (index <= 0)
                    {
                        throw new FormatException($": char index error on **{targetLine}**, {fileName}");
                    }
                    var splitted = targetLine.Split(':', 2, StringSplitOptions.TrimEntries);
                    var key = splitted[0];
                    if (compMap[fileNameSimple].ContainsKey(key))
                    {
                        resultMap.Add(key, CutString(splitted[1]));
                    }
                }
                finalResultMap.Add(fileNameSimple, resultMap);
            }
        }
        outputWriter.WriteLine(JsonSerializer.Serialize(finalResultMap, unsafeOptions));
    }
}

string CutString(string input) {
    var builder = new StringBuilder(input)
    .Replace("\u0000", "")
    .Replace(@"\<N14>", "")
    .Replace(@"\<N15>", "")
    .Replace(@"\n", " ");
    if (builder[0] == '[' && builder[builder.Length-1] == ']')
    {
        return builder.ToString(1, builder.Length-2);
    }
    else return builder.ToString();
}