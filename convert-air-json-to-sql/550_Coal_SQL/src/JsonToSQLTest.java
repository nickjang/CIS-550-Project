import java.io.IOException;

import org.junit.jupiter.api.Test;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

class JsonToSQLTest {

	@Test
	void test() throws JsonParseException, JsonMappingException, IOException {
		JsonToSQL jsql = new JsonToSQL();
		jsql.createSQL();
	}

}
