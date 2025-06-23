<script setup>
import { ref, onMounted } from 'vue'
import { getAllRecetas } from '../service/api.js'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import { useRouter } from 'vue-router'
import 'swiper/css'

const router = useRouter()
const recetas = ref([])

const cargarRecetas = async () => {
    try {
        const data = await getAllRecetas()
        recetas.value = data
    } catch (error) {
        console.error("Error al cargar las recetas:", error)
    }
}

function irADetalle(id) {
    router.push({ name: 'RecetaDetalleView', params: { id: id.toString() } })
}

onMounted(() => {
    cargarRecetas()
})
</script>

<template>
    <section class="carrusel-section">
        <h2>Sugerencias</h2>

        <Swiper :modules="[Autoplay]" loop freeMode grabCursor :autoplay="{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        }" :speed="4000" :space-between="30" :breakpoints="{
            0: { slidesPerView: 1.5 },
            640: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 }
        }">
            <SwiperSlide v-for="receta in recetas" :key="receta.id" @click="irADetalle(receta.id)">
                <div class="receta-slide" style="cursor: pointer">
                    <img :src="receta.enlaceImagen" alt="Imagen de receta" />
                    <h4>{{ receta.nombreReceta }}</h4>
                </div>
            </SwiperSlide>

        </Swiper>
    </section>
</template>

<style scoped>
.carrusel-section {
    margin-top: 4rem;
    text-align: center;
}

.carrusel-section h2 {
    color: #4CAF50;
    margin-bottom: 1.5rem;
}

.receta-slide {
    transition: box-shadow 0.3s ease, transform 0.3s ease;
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.receta-slide:hover {
    transform: none;
    transform: scale(1.03);
}

.receta-slide img {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 6px;
}

.receta-slide h4 {
    color: #333;
    margin-top: 0.8rem;
}
</style>