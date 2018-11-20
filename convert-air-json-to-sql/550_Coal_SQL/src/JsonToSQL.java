import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.*;


@JsonIgnoreProperties(ignoreUnknown = true)
public class JsonToSQL {
	public JsonToSQL() {
		
	}
	
	public void createSQL() throws JsonParseException, JsonMappingException, IOException {
		String s = new String("CREATE TABLE Air (\r\n" + 
				"    countyFlips int,\r\n" + 
				"    days int \r\n" + 
				");");
		JsonNode arrNode = new ObjectMapper().readTree(new File("air.json")).get("data");
		if (arrNode.isArray()) {
		    for (final JsonNode objNode : arrNode) {
		        if (objNode.isArray()) {
		        	Iterator<JsonNode> it = objNode.iterator();
		        	String val = "";
		        	String type = "Number of days with maximum 8-hour average ozone concentration over the National Ambient Air Quality Standard\"";
		        	for (int i = 0; i <= 9; i++ ) {
		        		val = it.next().toString();
		        	}
		        	if (val.endsWith(type)) {
		        		for (int i = 0; i <= 4; i++ ) {
			        		val = it.next().toString();
			        	}
		        		s += "\r\nINSERT INTO Air (countyFlips, days)\r\nVALUES (" + val + ", ";
		        		for (int i = 0; i <= 2; i++ ) {
			        		val = it.next().toString();
			        	}
		        		s += val + ");";
		        	}
		        }
		        	
		    }
		}
		s = s.replaceAll("\'", "");
		s = s.replaceAll("\"", "");
		BufferedWriter writer = new BufferedWriter(new FileWriter("air.sql", false));
		writer.append(s);
	    writer.close();
	}
	
}
