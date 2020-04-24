public class HelloJava {

    public static void main(String[] args) {
        outloop:
        for (int i = 0; i < 10; i++) {
            for (int j = 0; j < 10; j++) {

                System.out.println(i+":"+j);
                if(1 == j%2) break outloop;
            }
        }

        int values[] = new int[5];
        for (int i = 0; i < values.length; i++) {
            values[i] = (int) (Math.random() * 10);
        }

        for (int each : values) {
            System.out.print(each + ",");
        }
        System.out.println();

        int b[][] = new int[][] {
            {1, 2, 3},
            {4, 5, 6},
            {7, 8, 9}
        };
        System.out.println(b);
        for (int[] each : b) {
            System.out.println(each);
            for (int eachValue : each) {
                System.out.print(eachValue + ",");
            }
            System.out.println();
        }

        // Array initialization
        int[][] a = new int[2][];
        a[0] = new int[3];
        a[1] = new int[5];
        System.out.println(a.length + "," + a[0].length + "," + a[1].length);

        char[][] c = new char[][] {
            {'a','c', 'b'},
            {'a', 'b', 'c', 'd', 'e'}
        };

        for (char[] array : c) {
            for (char arrayvalue : array) {
                System.out.print(arrayvalue + ",");
            }
            System.out.println();
        }

        // 5x5 array
        int[][] array1 = new int[5][5];

        
        for (int i = 0; i < array1.length; i++) {
            for( int j = 0; j < array1[i].length; j++) {
                array1[i][j] = (int)(Math.random() * 100);
                System.out.print(array1[i][j] +", ");
            }
            System.out.println();
        }
        // find max value 
        int n = 0;
        int i0 = 0;
        int j0 = 0;
        for (int i = 0; i < array1.length; i++) {
            for (int j = 0; j < array1[i].length; j++) {
                if (n < array1[i][j]) {
                    n = array1[i][j];
                    i0 = i;
                    j0 = j;
                }
            }
        }
        System.out.println(array1[i0][j0] + ":" + i0 + "," + j0);
    }
}