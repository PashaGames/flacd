<template>
    
        <div class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full">
            <div class="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-75"></div>
            <div class="z-50 w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
                <div class="flex items-center justify-between mb-4">
                    <span class="text-lg font-medium text-gray-900">{{title}}</span>
                    <button class="text-gray-500 hover:text-gray-400" @click="$emit('closeAlert')">
                    
                        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M6.697 6.697c.782-.783 2.048-.783 2.83 0L12 9.17l2.475-2.475a2 2 0 112.828 2.828L14.83 12l2.475 2.475a2 2 0 11-2.828 2.828L12 14.83l-2.475 2.475a2 2 0 11-2.828-2.828L9.17 12 6.697 9.525a2 2 0 010-2.828z"/></svg>
                    </button>
                </div>
                <p class="text-gray-700">{{$t(content)}}</p>
            </div>
        </div>

</template>
<script>
export default {
 props: ['title','content']
}
</script>
